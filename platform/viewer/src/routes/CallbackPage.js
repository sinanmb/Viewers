import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CallbackComponent } from 'redux-oidc';
import api from '../utils/api';

class CallbackPage extends Component {
  static propTypes = {
    userManager: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.state = { showCallbackComponent: false };
  }

  componentDidMount() {
    const id_token = window.location.href.split('id_token=')[1].split('&')[0];

    api
      .post('users/verify_token', { id_token })
      .then(response => this.setState({ showCallbackComponent: true }))
      .catch(error => {
        alert("Can't validate id_token. You will be redirected to login");
        this.props.userManager.signinRedirect();
      });
  }

  render() {
    return (
      this.state.showCallbackComponent && (
        <CallbackComponent
          userManager={this.props.userManager}
          successCallback={() => {
            const pathname = sessionStorage.getItem('ohif-redirect-to');
            this.props.history.push(pathname);
          }}
          errorCallback={error => {
            //this.props.history.push("/");
            throw new Error(error);
          }}
        >
          <div>Redirecting...</div>
        </CallbackComponent>
      )
    );
  }
}

export default withRouter(CallbackPage);

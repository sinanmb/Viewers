import { connect } from 'react-redux';

import StudyListRoute from './StudyListRoute.js';
import { selectWorkingList } from '../actions/workingListActions';

const isActive = a => a.active === true;

const mapStateToProps = state => {
  const activeServer = state.servers.servers.find(isActive);

  return {
    server: activeServer,
    user: state.oidc.user,
  };
};

const ConnectedStudyList = connect(
  mapStateToProps,
  { selectWorkingList }
)(StudyListRoute);

export default ConnectedStudyList;

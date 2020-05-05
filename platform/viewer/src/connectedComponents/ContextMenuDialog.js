import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SimpleDialog, ToolbarButton } from '@ohif/ui';
import { MODULE_TYPES } from '@ohif/core';

// import csTools from 'cornerstone-tools';
import PreviousStudyButton from './PreviousStudyButton';
import NextStudyButton from './NextStudyButton';
import ReviewButtonComponent from './ReviewButtonComponent';
import { commandsManager, extensionManager } from './../App.js';

class ContextMenuDialog extends Component {
  static propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const toolbarButtonDefinitions = _getContextMenuButtons.call(this);

    this.state = {
      toolbarButtons: toolbarButtonDefinitions,
      activeButtons: [],
    };
  }

  render() {
    const dialogContentStyle = {
      width: '10rem',
      marginLeft: 'auto',
      marginRight: 'auto',
    };

    const buttonComponentsStyle = {
      height: '4rem',
      marginTop: '1rem',
    };

    const buttonComponents = _getButtonComponents.call(
      this,
      this.state.toolbarButtons,
      this.state.activeButtons
    );

    return (
      <SimpleDialog
        headerTitle={this.props.title}
        onClose={this.props.onClose}
        onConfirm={this.props.onClose}
        isFooterHidden={true}
      >
        <div style={dialogContentStyle}>
          <div style={buttonComponentsStyle}>{buttonComponents}</div>

          <div>
            <ReviewButtonComponent action="reject" />
            <PreviousStudyButton />
            <NextStudyButton />
          </div>
        </div>
      </SimpleDialog>
    );
  }
}

function _getContextMenuButtons() {
  const buttonIdsArray = ['Zoom', 'Pan', 'Wwwc']; // Wwwc is Levels
  const buttonIdsSet = new Set(buttonIdsArray);

  const toolbarModules = extensionManager.modules[MODULE_TYPES.TOOLBAR];
  const toolbarButtonDefinitions = [];

  toolbarModules.forEach(extension => {
    const { definitions, defaultContext } = extension.module;

    definitions.forEach(definition => {
      const context = definition.context || defaultContext;

      if (
        context === 'ACTIVE_VIEWPORT::CORNERSTONE' &&
        buttonIdsSet.has(definition.id)
      ) {
        toolbarButtonDefinitions.push(definition);
      }
    });
  });

  return toolbarButtonDefinitions;
}

/**
 * Determine which extension buttons should be showing, if they're
 * active, and what their onClick behavior should be.
 */
function _getButtonComponents(toolbarButtons, activeButtons) {
  const _this = this;
  return toolbarButtons.map(button => {
    return _getDefaultButtonComponent.call(_this, button, activeButtons);
  });
}

function _getDefaultButtonComponent(button, activeButtons) {
  return (
    <ToolbarButton
      key={button.id}
      label={button.label}
      icon={button.icon}
      onClick={_handleToolbarButtonClick.bind(this, button)}
      isActive={activeButtons.map(button => button.id).includes(button.id)}
    />
  );
}

/**
 * TODO: DEPRECATE
 * This is used exclusively in `extensions/cornerstone/src`
 * We have better ways with new UI Services to trigger "builtin" behaviors
 *
 * A handy way for us to handle different button types. IE. firing commands for
 * buttons, or initiation built in behavior.
 *
 * @param {*} button
 * @param {*} evt
 * @param {*} props
 */
function _handleToolbarButtonClick(button, evt, props) {
  const { activeButtons } = this.state;

  if (button.commandName) {
    const options = Object.assign({ evt }, button.commandOptions);
    options.mouseButtonMask = 2;
    commandsManager.runCommand(button.commandName, options);
  }

  // TODO: Use Types ENUM
  // TODO: We can update this to be a `getter` on the extension to query
  //       For the active tools after we apply our updates?
  if (button.type === 'setToolActive') {
    const toggables = activeButtons.filter(
      ({ options }) => options && !options.togglable
    );
    this.setState({ activeButtons: [...toggables, button] });
  } else if (button.type === 'builtIn') {
    this._handleBuiltIn(button);
  }
}

export { ContextMenuDialog };

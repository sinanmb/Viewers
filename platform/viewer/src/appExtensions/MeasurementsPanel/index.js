import React from 'react';
import ConnectedMeasurementTable from './ConnectedMeasurementTable.js';
import init from './init.js';

import LabellingFlow from '../../components/Labelling/LabellingFlow';
import { LandmarkDialog } from '@ohif/ui';
import LandmarkLocationButtonGroup from '../../connectedComponents/LandmarkLocationButtonGroup.js';

export default {
  /**
   * Only required property. Should be a unique value across all extensions.
   */
  id: 'measurements-table',

  preRegistration({ servicesManager, commandsManager, configuration = {} }) {
    init({ servicesManager, commandsManager, configuration });
  },

  getPanelModule({ servicesManager, commandsManager }) {
    const { UINotificationService, UIDialogService } = servicesManager.services;

    const showLabellingDialog = (props, measurementData) => {
      if (!UIDialogService) {
        console.warn('Unable to show dialog; no UI Dialog Service available.');
        return;
      }

      UIDialogService.dismiss({ id: 'labelling' });
      UIDialogService.create({
        id: 'labelling',
        centralize: true,
        isDraggable: false,
        showOverlay: true,
        content: LabellingFlow,
        contentProps: {
          measurementData,
          labellingDoneCallback: () =>
            UIDialogService.dismiss({ id: 'labelling' }),
          updateLabelling: ({ location, description, response }) => {
            measurementData.location = location || measurementData.location;
            measurementData.description = description || '';
            measurementData.response = response || measurementData.response;

            commandsManager.runCommand(
              'updateTableWithNewMeasurementData',
              measurementData
            );
          },
          ...props,
        },
      });
    };

    const showLandmarkDialog = measurementData => {
      if (!UIDialogService) {
        console.warn('Unable to show dialog; no UI Dialog Service available.');
        return;
      }

      UIDialogService.dismiss({ id: 'landmark' });
      UIDialogService.create({
        id: 'landmark',
        centralize: true,
        isDraggable: false,
        showOverlay: true,
        content: LandmarkDialog,
        contentProps: {
          title: 'Edit annotation',
          measurementData,
          onClose: () => UIDialogService.dismiss({ id: 'landmark' }),
          onSubmit: updatedData => {
            measurementData.location = updatedData.label;
            // If change happens here, also update init.js in extensions/cornerstone/src
            measurementData.version = 1;
            measurementData.reviewedBy = window.store.getState().oidc.user.profile.email;

            if (updatedData.label.includes('Nerve')) {
              measurementData.description = updatedData.position;
            }

            measurementData.annotation = updatedData;

            commandsManager.runCommand(
              'updateTableWithNewMeasurementData',
              measurementData
            );
            UIDialogService.dismiss({ id: 'landmark' });
          },
        },
      });
    };

    const ExtendedConnectedMeasurementTable = () => (
      <>
        <ConnectedMeasurementTable
          onRelabel={tool =>
            showLabellingDialog(
              { editLocation: true, skipAddLabelButton: true },
              tool
            )
          }
          onEditDescription={tool => {
            if (tool.toolType === 'Landmark') {
              showLandmarkDialog(tool);
            } else {
              showLabellingDialog({ editDescriptionOnDialog: true }, tool);
            }
          }}
          onSaveComplete={message => {
            if (UINotificationService) {
              UINotificationService.show(message);
            }
          }}
        />
      </>
    );
    return {
      menuOptions: [
        {
          icon: 'list',
          label: 'Measurements',
          target: 'measurement-panel',
        },
      ],
      components: [
        {
          id: 'measurement-panel',
          component: ExtendedConnectedMeasurementTable,
        },
      ],
      defaultContext: ['VIEWER'],
    };
  },
};

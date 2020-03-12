import React from 'react';
import MetadataPanel from './MetadataPanel.js';

export default {
  /**
   * Only required property. Should be a unique value across all extensions.
   */
  id: 'metadata-panel-module',

  getPanelModule({ servicesManager, commandsManager }) {
    // const { UINotificationService, UIDialogService } = servicesManager.services;

    const MetadataComponent = () => <MetadataPanel />;

    return {
      menuOptions: [
        {
          icon: 'list',
          label: 'Metadata',
          target: 'metadata-panel',
        },
      ],
      components: [
        {
          id: 'metadata-panel',
          component: MetadataComponent,
        },
      ],
      defaultContext: ['VIEWER'],
    };
  },
};

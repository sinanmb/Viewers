window.config = {
  routerBasename: '/',
  whiteLabelling: {},
  showStudyList: true,
  servers: {
    dicomWeb: [
      {
        name: 'Orthanc',
        wadoUriRoot: '/wado',
        qidoRoot: '/dicom-web',
        wadoRoot: '/dicom-web',
        qidoSupportsIncludeField: false,
        imageRendering: 'wadors',
        thumbnailRendering: 'wadors',
      },
    ],
  },
  hotkeys: [
    // Custom
    {
      commandName: 'nextViewport',
      label: 'Next Viewport',
      keys: ['`'],
    },
    { commandName: 'selectNerve', label: 'Select Nerve', keys: ['1'] },
    { commandName: 'selectStenosis', label: 'Select Stenosis', keys: ['2'] },
    // Original
    { commandName: 'nextImage', label: 'Next Image', keys: ['down'] },
    { commandName: 'previousImage', label: 'Previous Image', keys: ['up'] },
    {
      commandName: 'previousViewportDisplaySet',
      label: 'Previous Series',
      keys: ['pagedown'],
    },
    {
      commandName: 'nextViewportDisplaySet',
      label: 'Next Series',
      keys: ['pageup'],
    },
  ],
};

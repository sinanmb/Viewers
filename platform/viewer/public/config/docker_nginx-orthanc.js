window.config = {
  routerBasename: '/',
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
  oidc: [
    {
      authority: 'https://accounts.google.com',
      client_id:
        '588078611049-3hln69o6aca6htppe0u14l3f1gjrid4p.apps.googleusercontent.com',
      redirect_uri: 'http://localhost:3000/callback',
      response_type: 'id_token',
      scope: 'openid email',
      post_logout_redirect_uri: '/logout-redirect.html',
    },
  ],
};

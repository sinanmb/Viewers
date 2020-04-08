# Deploying Viewer

## Clone the viewers repository

```
git clone https://github.com/spreemohealth/Viewers.git
```

## Setup the environment variable

```
APP_CONFIG=aws
```

## Setup Orthanc config

Open platform/viewer/public/config/aws.js Add the host for

```
wadoUriRoot: '<host>:<port>/wado',
qidoRoot: '<host>:<port>/dicom-web',
wadoRoot: '<host>:<port>/dicom-web',
```

## Install the viewers

```

// If you haven't already, enable yarn workspaces yarn config set
workspaces-experimental true

// Restore dependencies yarn install

// Build source code for production yarn run build

```

https://docs.ohif.org/deployment/recipes/build-for-production.html

## Install Nginx

`sudo apt-get install nginx`

## Replace default nginx.conf file

Replace the default nginx.conf file (probably in /etc/nginx) by the viewer
nginx.conf file

## Update nginx.conf file

Line 33, inside upstream orthanc-server: `server <host>:<port>`

Line 39, inside server, `server_name <host>` (probably localhost)

Line 46, under location /, `root <absolute/location/of/dist/folder>`

Line 72, under location /dicom-web, `proxy_pass <host>/<port>`

## Start nginx

`sudo systemctl start nginx`

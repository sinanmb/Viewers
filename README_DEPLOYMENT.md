# Deploying Viewer

## Fetch the latest code

Clone the repository if it hasn't been cloned already

```
git clone https://github.com/spreemohealth/Viewers.git
```

Otherwise pull the latest changes from master branch

```
git pull origin master
```

## Setup the environment variables

```
APP_CONFIG=config/aws.js
VIEWER_SERVICE_BASE_URL=<host>/api/v1 // host will be Viewers EC2 Instance IP address
```

## Setup Orthanc config

Open platform/viewer/public/config/aws.js and add the host for these lines. The
host will be the IP address of the Viewers EC2 instance

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

Line 33, inside upstream orthanc-server: `server <host>:<port>` -- IP Address of
dicom-web EC2 instance

Line 39, inside server, `server_name <host>` -- IP Address of Viewers EC2
instance

Line 46, under location /, `root <absolute/location/of/dist/folder>`

Line 72, under location /dicom-web, `proxy_pass <host>/<port>` -- IP Address of
dicom-web EC2 instance

## Start nginx

`sudo systemctl start nginx`

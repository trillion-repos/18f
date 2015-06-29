# Get Started
Please  use one of the below options to install Trillion OpenFDA Visualization Platform

1. Docker Container
2. Manual installation with Node.js

### Docker Container
It is assumed that [docker] or [boot2docker] is already installed on your local machine and the service is running for these instructions.

```sh
$ docker pull trilliongit/18f
$ docker -p 3000:3000 -d trilliongit/18f
```
Once running the application can be accessed at -

* http://localhost:3000
* http://<<your computer IP>>:3000

If using boot2docker, get the VM's IP using

```sh
$ boot2docker ip
```

### Manual installation with Node.js
It is assumed that [node.js] is installed and configured on your system for these instructions.

#### Build
```sh
$ git clone git@github.com:trillion1-repos/18f.git
$ cd 18f
$ npm install
$ npm install -g forever
$ npm test
```

#### Run
```sh
$ forserver start server.js
```
Once running the application can be accessed at -
* http://localhost:3000
* http://<your computer IP>:3000

[docker]:https://www.docker.com
[boot2docker]:http://boot2docker.io
[node.js]:https://nodejs.org

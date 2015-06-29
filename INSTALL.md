## Get Started
Please  use one of the below options to install Trillion OpenFDA Visualization Platform

1) Docker Container
2) Manual installation with Node.js

# Docker Container
It is assumed that Docker or Boot2Docker is already installed on your local machine and the service is running for these instructions.

```sh
$ docker pull trilliongit/18f
$ docker -p 3000:3000 -d trilliongit/18f
```
Application can be accessed at -

http://localhost:3000 on http://localhost:3000/ or http://<your computer IP>:3000 on linux

On Windows, get the IP using boot2docker ip and http://<ip>:3000


2) Option two for Installation

Install with node JS
* Install node.js
* Install git


# Build
```sh
$ git clone git@github.com:trillion1-repos/18f.git
$ cd 18f
$ npm install
$ npm install -g forever
$ npm test
```

# Run
```sh
$ forserver start server.js
```
Application can be accessed at -
http://localhost:3000/ or http://<your computer IP>:3000

## Get Started
Please  use one of the below options to install Trillion OpenFDA Visualization Platform

1) Option one for Installation

Install with Docker Container
* Install docker.
* If your operating system is Windows or Mac, please use boot2docker
* Start docker service

## Build openFDA  in docker container
* docker pull trilliongit/18f

## Run the App on the docker container
```sh
$ docker -p 3000:3000 -d trilliongit/18f
```
* Open your browser
* http://localhost:3000 on http://localhost:3000/ or http://<your computer IP>:3000 on linux
* On Windows, get the IP using boot2docker ip and http://<ip>:3000


2) Option two for Installation

Install with node JS
* Install node.js
* Install git


## Build openFDA
```sh
$ git clone git@github.com:trillion1-repos/18f.git
$ cd 18f
$ npm install
$ npm install -g forever
$ npm test
```

## Run the App
```sh
$ forserver start server.js
$ http://localhost:3000/ or http://<your computer IP>:3000
```

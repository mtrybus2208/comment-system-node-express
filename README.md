# Comment system with role based authentication [node/express/jwt] [![CircleCI](https://circleci.com/gh/mtrybus2208/comment-system-node-express.svg?style=svg)](https://circleci.com/gh/mtrybus2208/comment-system-node-express)

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)
- [Features](#features)
- [Status](#status)

## General info

Comment system with role based authentication [node/express/jwt]

- Swagger docs available at `localhost:5000/api-docs/`
- Postman collection available at this [link](https://documenter.getpostman.com/view/5271690/SWLiZ62N)

## Technologies

- node
- express
- joi
- mongodb
- mongoose
- jwt
- swagger
- nodemailer
- vagrant

## Setup

### Environment variables:

- create .env file in root folder
- enter variables values:

```
PORT=5000
DB_NAME=comments-system
DB_HOST=localhost
DB_PORT=27017
EMAIL_SERVICE = gmail
EMAIL_HOST = smtp.gmail.com
EMAIL_AUTH_USER = your.email@gmail.com
EMAIL_AUTH_PASS = password
NOTIFICATION_SOURCE = comments.system.notification
```

### Vagrant setup:

- Install VirtualBox or other virtual machine hypervisor
- Install Vagrant 2.0

```
$ cd vagrant
$ vagrant up
$ vagrant ssh
$ cd api
$ npm run develop
```

## Features

- role based authentication
- reset password

To-do list:

- Typescript
- Docker

## Status

Project is: _in progress_

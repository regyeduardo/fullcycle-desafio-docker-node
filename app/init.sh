#!/bin/bash

npm install

chmod +x /app/wait-for-it.sh

/app/wait-for-it.sh db:3306 --

node app.js

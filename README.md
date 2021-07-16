# TilePlace-Backend
# The Nodejs backend for the tileplace app, which can be found at:  https://tileplace-bfb70.web.app/

This app is an R/Place clone made with NodeJS, Express and MongoDB. The board state is stored as a two dimensional array inside a MongoDB document. Socket.io is used to live update the frontend with changes. To start working on this app, you'll have to create your own .env file with a mongoDB connection url in it. You can use a local MONGOD instance or an atlas instance if you like. The first time you boot up the server, it will initialize a blank board state array in your database.

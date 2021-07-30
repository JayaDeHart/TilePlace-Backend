** TilePlace-Backend **
** The Nodejs backend for the tileplace app, which can be found at:  https://tileplace-bfb70.web.app/ **

<h2>Overview</h2>

Built by me, Jaya DeHart
This project is a live updating canvas that users can create art on in real time

<h2>Setup</h2>

Uses react-bootstrap, react-router and socket.io on the frontend, and express, bcrypt, mongoose and jsonwebtoken on the backend. All the necessary dependencies can be installed by simply running "npm install" once you've cloned the repo.

When setting up this project ensure that you clone both the frontend and backend repos. You will need to create a .env file on the frontend. The only variable you need there is "REACT_APP_CONNECTION_URL", set its value to http://localhost:5000, or change it to another port if you feel like it.

On the backend, set create an .env file with a value for DB_URL to connect a local mongodb database or an atlas database

<h2>Testing</h2>
The route GET "/boardstate" will return you a 180x320 2 dimensional array with color hex codes as values. This represents the drawable canvas on a pixel-pixel level

The route POST "/boardstate" expects data in a {x,y,color} format, representing the position and color of a single pixel to be updated. The api will respond with "succes" or 
"failure".

On the frontend, creating a new pixel will simultaneously post to this route and emit a socket.io event with the same information. This causes all instances of the frontend to update with the new pixel without creating a new request to the database

The only thing in the database is the boardstate, which as previously mentioned is a 180x320 2 dimensional array with color hex codes as values.

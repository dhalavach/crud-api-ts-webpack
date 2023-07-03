Simple CRUD API

All dependencies are in accordance with the task requirements (uuid is allowed in the task description; ts-loader, node-polyfill-webpack-plugin, webpack-cli and webpack-dev-server are webpack plugins; @types ... extension are also allowed; jest and ts-jest are used for testing )

to start the server in dev mode with nodemon:

1. npm install
2. npm run start:dev

to start the server in multi mode listening on several ports, run npm run start:multi

to run tests:

1. npm run test
   (also do npm install if you have done it before)

to build and start production build:

1. npm run build
2. npm run start:prod

The server will be listening on port 5000 (by default).
The address will be like http://localhost:5000/api/users
There is no frontend with UI, please use Postman for testing

Cheers!

if you have any questions, please email halavach@protonmail.com

Simple CRUD API

All dependencies are in accordance with the task requirements (uuid is allowed in the task description; ts-loader, node-polyfill-webpack-plugin, webpack-cli and webpack-dev-server are webpack plugins; @types ... extension are also allowed; jest and ts-jest are used for testing )

Clone the repository
Do the `npm install`

to start the server in dev mode with nodemon: `npm run start:dev`

to start the server listening on single port: `npm run start`

to start the server in multi mode listening on several ports: `npm run start:multi`

to run tests: `npm run test`

to build and start production build:

1. `npm run build`
2. `npm run start:prod`


The server will be listening on port 5000 (in single mode, by default).
In multi mode, servers will be accessible on 4001, 4002, 4003
Also see the console output ('The server is listening ...')
The address will be like http://localhost:5000/api/users
There is no frontend with UI, please use Postman for testing


if you have any questions, please email halavach@protonmail.com
Cheers!

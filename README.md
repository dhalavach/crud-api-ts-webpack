Simple CRUD API

All dependencies are in accordance with the task requirements (uuid is allowed in the task description; ts-loader, node-polyfill-webpack-plugin, webpack-cli and webpack-dev-server are webpack plugins; @types ... extension are also allowed; jest and ts-jest are used for testing )

Clone the repository

Switch to the develop branch

Do the `npm install`

to start the server in dev mode with nodemon: `npm run start:dev`

to start the server listening on single port: `npm run start`

to start the server in multi mode with load balancer: `npm run start:multi`

to run tests: `npm run test`

to build and start production build:

1. `npm run build`
2. `npm run start:prod`


The server will be listening on port 5000 (in single mode, by default).
In multi mode, the balancer will listen on 5000 and worker servers will be accessible on 5001, 5002, 5003 ... (depending on the .env file configuration)
Also see the console output ('The server is listening ...')
The address will be like http://localhost:5000/api/users
There is no frontend with UI, please use Postman for testing, see the assignment.md

NB: although some of the code has been merged into the main branch, the complete solution is on the develop branch.

if you have any questions, please email halavach@protonmail.com
Cheers!

# attackflow_15pg


## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.cs.adelaide.edu.au/Project-Attackflow/attackflow_15pg.git

# Go into the repository
$ cd attackflow_15pg

# Go into the server folder
$ cd server

# Install dependencies
$ npm install

# Run the server on localhost:5001
$ npm run dev

# Go into the client folder
$ cd client

# Install dependencies
$ npm install

# Run the server on localhost:3000
$ npm start
```

Refer to `env.example` for environment variables.

# Apple M1/M2 chips
One of the library is not supported on Mac M1/M2 chips with following error message
Bcrypt error on Mac - Incompatible architecture (have 'x86_64', need 'arm64e')

```bash
# Using yarn instead of npm on the server folder.
$ sudo rm -rf node_modules package-lock.json
$ yarn install
$ yarn start
```

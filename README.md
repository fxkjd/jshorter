# JShorter

A Node.js API to create an URL shortening service.


## Installing / Getting started

### Dependencies 
* Express
* MongoDB

Just clone this report and run:

```
npm install
```

To start JShorter run: 

```
npm start
```

## Configuration

There are two configuration files located in the `/config` folder:

- app.json
    - port - Listening port
    - secret - A random secret for passport sessions
    - env - Log level
- db.json
    - host - MongoDB IP
    - port - MongoDB port
    - name - MongoDB database

## Api Reference

The `/src/routes` folder contains the API route implementations. By default each route returns a JSON response but it is possible to overwrite them in order to use XML, HTML templates (EJS, Handlebars, ...) or whatever you like.

### User

User management API.

- /users/login
- /users/logout
- /users/register

### Links

Link management API. A valied session is necessary in order to interact with The Links API (see User API).

- /links/
- /links/new
- /links/update/:id
- /links/delete/:id

## Licensing

  [LGPL3](LICENSE)

## TODO
* Add tests
* Add more logging and logging options
* Migrate logging to winston
* Do some refactor

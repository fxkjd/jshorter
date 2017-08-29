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

### User

- /users/login
- /users/logout
- /users/register

### Links

A user session is necessary in order  to interact with The Links API.

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
* Add model validation
* Refactor callback hell functions to async/await

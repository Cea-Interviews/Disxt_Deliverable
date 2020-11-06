# Disxt_Deliverable

Disxt_ Deliverable is a simple Rest API built using Mongodb, Express and Node that implements CRUD tasks on products as well as implements authentication and role-based authentication.

### NPM Scripts

To get the server running locally:

- Clone this repo
- **npm install** to install all required dependencies
- **npm run server** to start the local server
- **npm test** to start server using testing environment

To run with docker:
- Clone this repo
- **docker-compose build** to build an image
- create a .env file at the root folder of this project and put your environmental variables
- **docker--compose run** to create a running container with default environment development

## Technologies

[NodeJS]() - is a JavaScript runtime built on Chrome's V8 JavaScript engine.

The [**Express.js**](https://expressjs.com/) backend framework was used to build the server. Fast, unopinionated, minimalist web framework for Node.js

## Supporting Packages

Linter

- [ESLint](https://eslint.org/) - The pluggable linting utility for JavaScript and JSX

Test Tools

- [Jest](https://jestjs.io/) - Jest is a delightful JavaScript Testing Framework with a focus on simplicity.
- [Supertest](https://github.com/visionmedia/supertest)
-

## API Documentation

The API endpoints for the server has a BaseUrl of ({domain}/api/v1)

## USERS
---

### User Routes

| Method | Endpoint           | Access Control      | Description                          |
| ------ | ------------------ | ------------------- | ------------------------------------ |
| POST   | `/auth/login`      | all users           | Returns info for the logged in user. |
| POST   | `/auth/signup`   | all users           | Adds a user to the database.         |
| GET    | `/auth/logout`   | all users |Logs out a user |
| GET   | `/users/:id` | authenticated users           | Client can view personal info, admins can view info of other users                |
| PATCH  | `/users/:id`   | admins |   Admins can assign the role of admins to clients                                   |

---

```javascript
{
  id objectId
  username string unique required
  firstname string  required
  lastname string required
  age number required
  password string required
}
```
### Actions


### Add a new user [POST]

**URL**: _{BaseUrl}/auth/signup_

**Returns**: An object containing the user credentials.

Input

```javascript
{
 "username": "username",
 "firstname": "userfirstname",
 "lastname": "userlastname",
 "password": "n17chrobmn",
 "age": 20
}
```
Returns

```javascript
{
  "status": 201,
  "data": {
    "id": "5fa5c57e29e83b05c8b000cb",
    "username": "username",
    "firstname": "userfirstname",
    "lastname": "userlastname",
    "age": "20"
  }
}
```

### Login a user [POST]

**URL**: _{BaseUrl}/auth/login_

**Returns**: An object containing the user credentials.

Input

```javascript
{
 "username": "username",
 "password": "n17chrobmn",
}
```
Returns

```javascript
{
  "status": 200,
  "data": {
    "id": "5fa5c57e29e83b05c8b000cb",
    "username": "username"
  }
}
```
and generate a jwt embedded in a cookie for better security against XSS

### Edit User Role [PATCH]

**URL**: _{BaseUrl}/users/5fa5c57e29e83b05c8b000cb_

**Returns**: An object which holds the users credentials.

Input

```javascript
{
 "role": "admin"
}
```

Returns

```javascript

{ "status":200,
  "data": {
    "_id": "5fa5c57e29e83b05c8b000cb",
    "username": "username",
    "firstname": "userfirstname",
    "lastname": "userlastname",
    "age": "20",
    "role": "admin"
  }
}

```

### Get a user [GET]

**URL**: _{BaseURl}/users/5fa5c57e29e83b05c8b000cb

**Returns**: An object with the user details

Returns

```javascript

{ "status": 200,
  "data": {
    "_id": "5fa5c57e29e83b05c8b000cb",
    "username": "username",
    "firstname": "userfirstname",
    "lastname": "userlastname",
    "age": "20",
    "role": "admin"
  }
}
```
### Logout a user [GET]

```javascript
{
  "status": 200,
  "data": "Logout Successful"
}
```

**URL**: _{BaseURl}/auth/logout

## Products
---
#### Product Routes

| Method | Endpoint                 | Access Control      | Description                         |
| ------ | ------------------------ | ------------------- | ----------------------------------- |
| GET    | `/products`             | authenticated users  |  Returns all products |
| GET    | `/products/:productId` | autthenticated users  | Returns a single product with the created_by option showing for only admins |
| POST   | `/products`            | only admins | Adds a product  |
| PUT    | `/products/:productId` | only admins | Update the product information      |
| DELETE | `/products/:productId` | only admins | Deletes a product |


```javascript
{
  id objectId
  name string required
  description string required
  price number required
  created_by objectId ref required
}
```

### Actions

### Add a new products [POST]

**URL**: _{BaseUrl}/products_

**Returns**: An object containing the product information.

Input

```javascript
{
	"name": "amaglobe",
	"description": "finder",
	"price": 300.00000067
}
```
Returns

```javascript
{
  "status": 201,
  "data": {
    "_id": "5fa536a56e382a039be74e2c",
    "name": "amaglobe",
    "description": "finder",
    "price": 300.00000067,
    "created_by": "5fa5c57e29e83b05c8b000cb"
    }
  }
}

```

### Update a product [PUT]

**URL**: _{BaseUrl}/products/5fa536a56e382a039be74e2c_

**Returns**: An object containing the product information.

Input

```javascript
{
 "name": "amafly",
 "description": "something different",
}
```
Returns

```javascript
{
  "status": 200,
  "data": {
    "_id": "5fa536a56e382a039be74e2c",
    "name": "amafly",
    "description": "something  different",
    "price": 300.00000067,
    "created_by":
       {
        "_id": "5fa51ee1bf11b5001f4c177d",
        "username": "b1"
      }
  }
}
```


### Get a product [GET]

**URL**: _{BaseUrl}/products/5fa5c57e29e83b05c8b000cb_

**Returns**: An object with product information.


Returns

```javascript

{ "status":200,
  "data": {
    "_id": "5fa5c57e29e83b05c8b000cb",
    "name": "rollercoster",
    "description": "something  different",
    "price": 300.00000067,
    "created_by": {
        "_id": "5fa51ee1bf11b5001f4c177d",
        "username": "b1"
      }
  }
}

```

### Get all products [GET]

**URL**: _{BaseURl}/products

**Returns**: List of all products

Returns

```javascript

{
  "status": 200,
  "data": [
    {
      "_id": "5fa53047eec46902cc1497ef",
      "name": "Amavibes",
      "price": 3000,
      "description": "Amazon campaign for musics",
      "created_by": { // this field shows where the logged in user is an admin
        "_id": "5fa51ee1bf11b5001f4c177d",
        "username": "b1"
      }
    },
    {
      "_id": "5fa536a56e382a039be74e2c",
      "name": "Amafly",
      "price": 3000,
      "description": "Amazon campaign for musics",
      "created_by": {  // this field shows where the logged in user is an admin
        "_id": "5fa51ee1bf11b5001f4c177d",
        "username": "b1"
      }
    }
  ]
}

```
### Delete a Product [DELETE]

**URL**: _{BaseUrl}/products/5fa5c57e29e83b05c8b000cb_

```javascript
{
  "status": 200,
  "data": "Product Deleted"
}
```

## Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

- PORT - The port the server will start on functionality not available in SQLite
- MONGO_URL - mongodb development and production url
- TEST_URL - mongodb test url
- ADMIN_LOGIN - one time password for assigning first signup user to admin role, must meet the format for password
- ACCESS_SECRET  - secret for signing JWT

## Error Handling

### Input Validation Errors

All validation errors are in the form of

```Javascript
{
  "status": 400,
  "error": [
    "role must be one of [admin, client]",
    "role contains an invalid value",
    "role is not allowed to be empty"
  ]
}
```

### Other  Errors
other errors are in the form of

```Javascript
{
  "status": {ErrorstatusCode},
  "error": "error message"
}
```

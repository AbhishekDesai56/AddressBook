
# AddressBook

We are creating the addressbook to stored the contact of the user.


## Authors

- [@Abhishek Desai](https://www.github.com/abhishekdesai56)

  
## Requirement

**Server:** Node, Express, Mongoose

  
## Run Locally

Clone the project

```bash
  git clone https://github.com/AbhishekDesai56/AddressBook.git
```

Go to the project directory

```bash
  cd AddressBook
```

Install dependencies

```bash
  npm install express
  npm install mongoose
  npm install dotenv
  npm install joi
  npm install bcrypt
  npm install jsonwebtoken
  npm install chai
  npm install chai-http
  npm install mocha
  npm install nyc
  npm install swagger-ui-express
  npm install logger
  npm install nodemon
  npm install eslint
```

Start the server

```bash
  nodemon
```

  
## API Reference

### User
We are creating a user for login and register purpose.

#### Register a user

```http
  POST /saveUserData
```

| Parameter   | Type     | Description                |
| :--------   | :------- | :------------------------- |
| `firstName` | `string` | **Required**.  First Name  |
| `lastName`  | `string` | **Required**.  Last Name   |
| `email`     | `string` | **Required**.  Email       |
| `password`  | `string` | **Required**.  Password    |

#### Login User

```http
  POST /login
```

| Parameter   | Type     | Description                       |
| :--------   | :------- | :-------------------------------- |
| `email`     | `string` | **Required**.  Email              |
| `password`  | `string` | **Required**.  Password           |


#### Controller/Service/Model (app/../user.js)

In controller,  there are two function expression(saveUserData, login).
Controller works is to given input according to http verbs, so that it can pass parameter to the service and for service to goes to model class.

Model Class have mongoose implementation, it will process and return a result. so that result or response message is show by controller.

### AddressBook
We are performing CRUD operation in addressbook.

#### Note:
For Below API, **Token** is required which is generated after successful login.
#### Creating contact

```http
  POST /saveAddressBookData
```

| Parameter    | Type     | Description                |
| :--------    | :------- | :------------------------- |
| `firstName`  | `string` | **Required**.  First Name  |
| `lastName`   | `string` | **Required**.  Last Name   |
| `phoneNumber`| `number` | **Required**.  Phone number much me unique       |
| `city`       | `string` | **Required**.  city    |
| `pincode`    | `number` | **Required**.  Pin Code    |
| `address`    | `string` | **Required**.  Address    |

#### Get all addressbook

```http
  GET /getAddressBookData
```

#### Get addressbook by Id

```http
  GET /getAddressBookData/:{addressBookId}
```
**addressBookId**: It is pass by the user to get specific addressbook record. 
          

#### update addressbook by Id

```http
  UPDATE /updateAddressBookData/:{addressBookId}
```
**addressBookId**: It is pass by the user to get specific addressbook record. 
| Parameter    | Type     | Description                |
| :--------    | :------- | :------------------------- |
| `firstName`  | `string` | **Required**.  First Name  |
| `lastName`   | `string` | **Required**.  Last Name   |
| `phoneNumber`| `number` | **Required**.  Phone number much me unique       |
| `city`       | `string` | **Required**.  city    |
| `pincode`    | `number` | **Required**.  Pin Code    |
| `address`    | `string` | **Required**.  Address    |

#### delete addressbook by Id

```http
  DELETE /deleteAddressBookData/:{addressBookId}
```
**addressBookId**: It is pass by the user to get specific addressbook record.


#### Controller/Service/Model (app/../address.js)

In controller,  there are two function expression(saveAddressBookData, getAddressBookData, getAddressBookDataById, updateAddressBookData, deleteAddressBookDataById).
Controller works is to given input according to http verbs, so that it can pass parameter to the service and for service to goes to model class.

Model Class have mongoose implementation, it will process and return a result. so that result or response message is show by controller.
  

  
## Running Tests

To run tests, run the following command

```bash
  npm run test
```

## Running Swagger

To run swagger, run following command in browser

```bash
  [@Swagger](https://localhost:3000/api-docs)
```

## Installation

Install AddreeBook with npm and express also required

```bash
  npm install Address
  cd AddressBook
```
    
## Used By

This project is used by the common user.

  
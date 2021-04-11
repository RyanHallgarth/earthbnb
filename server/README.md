# EarthBnB API

## Table of Contents

- [Table of Contents](<##Table of Contents>)
- [Getting Started](<##Getting Started>)
- [api/auth](##api/auth)
  - [/login](###login)
  - [/logout](###logout)
  - [/user](###user)

<!-- toc -->

## Getting Started

Server API is set up.

- You can run `npm install`.
- Then `npm run start`.

If you’ve set up everything correctly you should only see `$ node ./src/bin/www` in your terminal.

Visit `http://localhost:3000/v1` (of course if you have a `PORT` environment variable set, use that) in your browser. You should see the following message:

```json
{
  "message": "Welcome to EarthBnB API"
}
```

## **api/auth**

### **login**

This will initiate a google login

- **URL**

  /api/auth/login

- **Method:**

  `GET`

- **Success Response:**

  On succesful login a user object from the mongoDB will be returned

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "_id":"6071f52eeefc1bd3b2030451",
      "providerID":"104172443333147730799",
      "provider":"google",
      "firstName":"Adam",
      "lastName":"Clarkson",
      "displayName":"Adam Clarkson",
      "email":"atclarks@iu.edu",
      "picture":"https://lh3.googleusercontent.com/a-/AOh14GjU3gmwv-PdxvlaWYVg8voLn_MvA653EtQkjUc2=s96-c",
      "providerProfile":{[OBJECT]},
      "__v":0
    }
    ```

- **Sample Call:**

  ```javascript
  axios
    .get('/api/auth/login', userData)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      console.log(err.response);
    });
  ```

- **Notes:**

  This needs tested. Works in browser, I'm also not 100% sure on the sample call. -ATC 4/12

### **logout**

This will initiate a google logout

- **URL**

  /api/auth/logout

- **Method:**

  `GET`

- **Success Response:**

  On succesful logout a success message will be returned

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "message": "User has been successfully logged out."
    }
    ```

- **Sample Call:**

  ```javascript
  fetch('/api/auth/logout')
    .then((response) => response.json())
    .then((data) => console.log(data));
  ```

- **Notes:**

  This needs tested. Works in browser, I'm also not 100% sure on the sample call. -ATC 4/12

### **user**

---

Get information about the currently logged in user.

- **URL**

  /api/auth/user

- **Method:**

  <_The request type_>

  `GET`

- **Success Response:**

  On succesful authenticating a loggein in user an object from the mongoDB will be returned

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "_id":"6071f52eeefc1bd3b2030451",
      "providerID":"104172443333147730799",
      "provider":"google",
      "firstName":"Adam",
      "lastName":"Clarkson",
      "displayName":"Adam Clarkson",
      "email":"atclarks@iu.edu",
      "picture":"https://lh3.googleusercontent.com/a-/AOh14GjU3gmwv-PdxvlaWYVg8voLn_MvA653EtQkjUc2=s96-c",
      "providerProfile":{[OBJECT]},
      "__v":0
    }
    ```

- **Error Response:**

  If no user is logged in a 404 with error message will be returned

  - **Code:** 404 NOT FOUND <br />
    **Content:** `{ error: 'No user logged in' }`

- **Sample Call:**

  ```javascript
  fetch('/api/auth/user')
    .then((response) => response.json())
    .then((data) => console.log(data));
  ```

- **Notes:**

# EarthBnB API

## Table of Contents

- [Table of Contents](<##Table of Contents>)
- [Getting Started](<##Getting Started>)
- [/api/auth](##api/auth)
  - [/login](###login)
  - [/logout](###logout)
  - [/user](###user)
- [/v1](##/v1)
  - [/listings](###listings)

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

---

---

## **api/auth**

---

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
    .get('/api/auth/login')
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

---

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

---

### **user**

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

---

---

## /v1

---

### **listings**

Listings will return a list of listings page by page.

- **URL**

  /v1/listings?page=1&limit=10&sort_by=title&order=asc

- **Method:**

  `GET`

- **URL Params**

  **Required:**

  `page=[integer]`

  `limit=[integer]`

  **Optional:**

  Sorting allows you to order the results by any field, in ascending or descending order.

  If you only need to sort one column at a time, you could put the column name in sort_by and the sort direction in order.

  `sort_by=[alphanumeric]`

  `order=[ASC|DESC]`

  At this time we do not support multi column sorting.

- **Success Response:**

  If successful you will be returned an object with n listings where n is the limit. The object will also contain useful information about how many results you have, how many results there are total, and what page you're on.

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "content": [], // all the response items will go in this array
      "page": 1, // current page
      "results_per_page": 5, // how many items available in "content"
      "total_results": 100 // total number of items
    }
    ```
    From there, you can discern that there are 20 pages with `total_results / results_per_page` and anything else you might need for the front end.

- **Error Response:**

  - **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "No results found" }`

  OR

  - **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Invalid Parameter" }`

- **Sample Call:**

  ```javascript
  $.ajax({
    url: '/v1/listings?page=1&limit=10&sort_by=title&order=asc',
    dataType: 'json',
    type: 'GET',
    success: function (r) {
      console.log(r);
    },
  });
  ```

- **Notes:**

  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._>

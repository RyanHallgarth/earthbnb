# EarthBnB API

## Table of Contents

- [Table of Contents](<##Table of Contents>)
- [Getting Started](<##Getting Started>)
- [/api/auth](##api/auth)
  - [/login](###login)
  - [/logout](###logout)
  - [/user](###user)
- [/api/v1](##/v1)
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

## /api/v1

---

### **listings**

Listings will return a list of listings page by page.

- **URL**

  /api/v1/listings?page=1&limit=5&sort_by=name&order=ASC&price[gte]=0&price[lte]=500&min_guests=5&min_bathrooms=2&min_bedrooms=2&min_beds=3

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

  `price=[number]` Not Working

  `price=[number]` Not Working

  `min_guests=[number]`

  `min_bathrooms=[number]`

  `min_bedrooms=[number]`

  `min_beds=[number]`

  At this time we do not support multi column sorting.

- **Success Response:**

  If successful you will be returned an object with n listings where n is the limit. The object will also contain useful information about how many results you have, how many results there are total, and what page you're on.

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "content": [
        {
          "id": 1,
          "name": "1 BR Apt in the Heart of Cap Hill",
          "description": "Your very own room and bath to use at night while you explore the city by day. Shared common area with fully equipped kitchen, tv and stereo.",
          "created_at": "2021-04-11T21:49:02.000Z"
        }
      ],
      "page": 1,
      "results_per_page": 50,
      "total_results": 1,
      "links": {
        "self": {
          "href": "/api/v1/listings?page=1&limit=50&sort_by=name&order=ASC"
        },
        "first": {
          "href": "/api/v1/listings?page=1&limit=50&sort_by=name&order=ASC"
        },
        "prev": {
          "href": null
        },
        "last": {
          "href": "/api/v1/listings?page=1&limit=50&sort_by=name&order=ASC"
        },
        "next": {
          "href": null
        }
      }
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
  var axios = require('axios').default;

  var options = {
    method: 'GET',
    url: 'http:///api/v1/listings',
    params: {
      page: '1',
      limit: '5',
      sort_by: 'name',
      order: 'ASC',
      'price[gte]': '0',
      'price[lte]': '500',
      min_guests: '5',
      min_bathrooms: '2',
      min_bedrooms: '2',
      min_beds: '3',
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
  ```

- **Notes:**
  - This endpoint is still a work in progress

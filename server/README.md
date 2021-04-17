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

---

### **listings/:id**

Returns a single listing based on id

- **URL**

  /api/v1/listings/:id

- **Method:**

  `GET`

- **Path Variables**

  **Required:**

  `:id=[integer]`

- **Success Response:**

  An object wiht a single listing is returned

  - **Code:** 200 <br />
    **Content:**

  ```json
  [
    {
      "id": 7920539,
      "name": "\"1898\" a FirstHill Victorian 3bdrm",
      "summary": "Come stay at the ...",
      "space": "It is a 900 sq....",
      "description": "Come stay at the...",
      "neighborhood_overview": "First Hill o...",
      "notes": "Great place for those...",
      "transit": "The Metro is two blocks ....",
      "thumbnail_url": "https://a0.muscache.com/ac/pictures/106012064/6467f076_original.jpg?interpolation=lanczos-none&size=small&output-format=jpg&output-quality=70",
      "medium_url": "https://a0.muscache.com/im/pictures/106012064/6467f076_original.jpg?aki_policy=medium",
      "picture_url": "https://a0.muscache.com/ac/pictures/106012064/6467f076_original.jpg?interpolation=lanczos-none&size=large_cover&output-format=jpg&output-quality=70",
      "xl_picture_url": "https://a0.muscache.com/ac/pictures/106012064/6467f076_original.jpg?interpolation=lanczos-none&size=x_large_cover&output-format=jpg&output-quality=70",
      "host_id": 27122439,
      "host_url": "https://www.airbnb.com/users/show/27122439",
      "host_name": "Anthony",
      "host_since": "2015-02-02T05:00:00.000Z",
      "host_location": "Seattle, Washington, United States",
      "host_about": "A true Seattle lite, I can point you in in the right direction.\nI spent 20 plus years in the hospitality business, So I can take good care of you if that's what you like.\nI'm easy going and looking to get a laugh out of you if I can, I live here with my 19 yr. old college going son and our four legged buddy Cola \nI travel as much as possible and have some developments over seas that you will want to come to !",
      "host_response_time": "within an hour",
      "host_response_rate": "100%",
      "host_acceptance_rate": "100%",
      "hostrue_is_superhostrue": 0,
      "host_thumbnail_url": "https://a2.muscache.com/ac/pictures/54bf19a9-f852-4c37-a4b0-b5908dbf7f9c.jpg?interpolation=lanczos-none&crop=w:w;*,*&crop=h:h;*,*&resize=50:*&output-format=jpg&output-quality=70",
      "host_picture_url": "https://a2.muscache.com/ac/pictures/54bf19a9-f852-4c37-a4b0-b5908dbf7f9c.jpg?interpolation=lanczos-none&crop=w:w;*,*&crop=h:h;*,*&resize=225:*&output-format=jpg&output-quality=70",
      "host_neighbourhood": "Seward Park",
      "host_listings_count": 2,
      "host_total_listings_count": 2,
      "host_verifications": "['email', 'phone', 'reviews', 'kba']",
      "hostrue_has_profalseile_pic": 1,
      "hostrue_identrueitruey_verifalsealseied": 1,
      "street": "10th Ave, Seattle, WA 98122, United States",
      "neighbourhood": "Yesler Terrace",
      "neighbourhood_cleansed": "Yesler Terrace",
      "neighbourhood_group_cleansed": "Downtown",
      "city": "Seattle",
      "state": "WA",
      "zipcode": "98122",
      "country": "United States",
      "latitude": 47.60327559,
      "longitude": -122.3203899,
      "is_locatrueion_exactrue": 1,
      "property_type": "Apartment",
      "room_type": "Entire home/apt",
      "accommodates": 6,
      "bathrooms": 1,
      "bedrooms": 3,
      "beds": 3,
      "bed_type": "Real Bed",
      "amenities": "{\"Wireless Internet\",Kitchen,\"Free Parking on Premises\",Heating,\"Family/Kid Friendly\",Washer,Dryer,\"Smoke Detector\",\"Carbon Monoxide Detector\",\"First Aid Kit\",\"Fire Extinguisher\",Shampoo}",
      "square_feet": null,
      "price": 165,
      "weekly_price": 1400,
      "monthly_price": 3500,
      "security_deposit": 500,
      "cleaning_fee": 75,
      "guests_included": 2,
      "extra_people": 25,
      "minimum_nights": 3,
      "maximum_nights": 1125,
      "calendar_updated": "2 weeks ago",
      "has_availabilitruey": 1,
      "availability_30": 25,
      "availability_60": 52,
      "availability_90": 82,
      "availability_365": 130,
      "calendar_last_scraped": "2016-01-04T05:00:00.000Z",
      "number_of_reviews": 5,
      "first_review": "2015-09-08T04:00:00.000Z",
      "last_review": "2015-12-01T05:00:00.000Z",
      "review_scores_rating": 100,
      "review_scores_accuracy": 10,
      "review_scores_cleanliness": 10,
      "review_scores_checkin": 10,
      "review_scores_communication": 10,
      "review_scores_location": 10,
      "review_scores_value": 10,
      "instrueantrue_bookable": 0,
      "cancellation_policy": "flexible",
      "require_guestrue_profalseile_pictrueure": 0,
      "require_guestrue_phone_verifalseicatrueion": 0,
      "calculated_host_listings_count": 2,
      "reviews_per_month": 1.26
    }
  ]
  ```

- **Error Response:**

  - **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "No results found" }`

  OR

  - **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Invalid Parameter" }`

- **Sample Call:**

  ```javascript
  var axios = require('axios');

  var config = {
    method: 'get',
    url: 'http://localhost:8080/api/v1/listings/7920539',
    headers: {},
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  ```

- **Notes:**

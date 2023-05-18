---
title: AutoRecruit API documentation

language_tabs:
  - shell
  - ruby
  - python
  - javascript

footer:
  - <a href='https://www.kaispe.com/'>Documentation Powered by Kaispe</a>

includes:
  - errors

search: true

attachments:
  - "./logo.png"
---

# Introduction

e-Recruitment portal is a virtual one-stop shop where employers can post job vacancies and candidates can find those jobs and apply. It allows recruiters to source, track, onboard and analyse new talent, simplifying the recruitment process.

To gain access to the APIs buy the AutoRecruit portal service from the azure marketplace.

BASE URL: https://arApi.kaispe.com/api/v1/:companyName

Here,
companyName is the sub url which is assigned to the buyer.

# Authentication

## Get Access Token

```ruby
require "uri"
require "net/http"

url = URI("{{BASE_URL}}/auth/createOAuthToken")

http = Net::HTTP.new(url.host, url.port);
request = Net::HTTP::Post.new(url)
request["clientid"] = "client-id"
request["clientsecret"] = "client-secret"

response = http.request(request)
puts response.read_body
```

```python
import requests

url = "{{BASE_URL}}/auth/createOAuthToken"

payload={}
headers = {
  'clientid': 'client-id',
  'clientsecret': 'client-secret'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)
```

```shell
curl --location -g --request POST '{{BASE_URL}}/auth/createOAuthToken' \
--header 'clientid: client-id' \
--header 'clientsecret: client-secret'
```

```javascript
var axios = require('axios');

var config = {
  method: 'post',
maxBodyLength: Infinity,
  url: '{{BASE_URL}}/auth/createOAuthToken',
  headers: { 
    'clientid': 'client-id', 
    'clientsecret': 'client-secret'
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

> The above command returns JSON structured like this:

```json
{
    "status": 200,
    "data": {
        "token_type": "Bearer",
        "expires_in": "4 hours",
        "accessToken": "accessToken"
    }
}
```

This endpoint is used to get the JWT access token.

### HTTP Request

`POST {{BASE_URL}}/auth/createOAuthToken`

### Header Parameters

Parameter | Description
--------- | -----------
clientid | The client id of the admin
clientsecret | The client secret of the admin


# Authorization

> To authorize, use this code:

```ruby
require 'portal'

api = portal::APIClient.authorize!('accessToken')
```

```python
import portal

api = portal.authorize('accessToken')
```

```shell
curl "api_endpoint_here"
  -H "Authorization: accessToken"
```

```javascript
const portal = require('portal');

let api = portal.authorize('accessToken');
```

> Make sure to replace `accessToken` with the token you get by calling the Get Access Token API.

AutoRecruit portal API uses a JWT token to allow access to the API which is retrieved by the Get Access Token API.

AutoRecruit portal API expects for the token to be included in all API requests to the server in a header that looks like the following:

`Authorization: Bearer accessToken`

<aside class="notice">
You must replace <code>accessToken</code> with the token received from the Get Access Token API.
</aside>







# Job locations
## Get all job locations

```ruby
require "uri"
require "net/http"

url = URI("{{BASE_URL}}/job/job_location")

http = Net::HTTP.new(url.host, url.port);
request = Net::HTTP::Get.new(url)
request["Authorization"] = "Bearer accessToken"

response = http.request(request)
puts response.read_body
```

```python
import requests

url = "{{BASE_URL}}/job/job_location"

payload={}
headers = {
  'Authorization': 'Bearer accessToken'
}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)
```

```shell
curl --location -g '{{BASE_URL}}/job/job_location' \
--header 'Authorization: Bearer accessToken'
```

```javascript
var axios = require('axios');

var config = {
  method: 'get',
maxBodyLength: Infinity,
  url: '{{BASE_URL}}/job/job_location',
  headers: { 
    'Authorization': 'Bearer accessToken'
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

```

> The above command returns JSON structured like this:

```json
{
    "docs": [
        {
            "_id": "63ca6989d7d8e33504044067",
            "street_address": "Gulshan",
            "city": "Karachi",
            "state": "Sindh",
            "country": "Pakistan",
            "zip": "75300",
            "delete_status": false,
            "createdAt": "2023-01-20T10:14:33.510Z",
            "updatedAt": "2023-01-20T10:14:33.510Z",
            "__v": 0
        },
        {
            "_id": "6423e1b7a58211f14c4e4d43",
            "street_address": "PECHS",
            "city": "Lahore",
            "state": "Punjab",
            "country": "Pakistan",
            "zip": "75300",
            "delete_status": false
        }
    ],
    "totalDocs": 2,
    "limit": 50,
    "totalPages": 1,
    "page": 1,
    "pagingCounter": 1,
    "hasPrevPage": false,
    "hasNextPage": false,
    "prevPage": null,
    "nextPage": null
}
```

This endpoint fetches all the locations of the job

### HTTP Request

`GET {{BASE_URL}}/job/job_location`



## Get job location

```ruby
require "uri"
require "net/http"

url = URI("{{BASE_URL}}/job/job_location/:id")

http = Net::HTTP.new(url.host, url.port);
request = Net::HTTP::Get.new(url)
request["Authorization"] = "Bearer accessToken"

response = http.request(request)
puts response.read_body
```

```python
import requests

url = "{{BASE_URL}}/job/job_location/:id"

payload={}
headers = {
  'Authorization': 'Bearer accessToken'
}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)
```

```shell
curl --location -g '{{BASE_URL}}/job/job_location/:id' \
--header 'Authorization: Bearer accessToken'
```

```javascript
var axios = require('axios');

var config = {
  method: 'get',
maxBodyLength: Infinity,
  url: '{{BASE_URL}}/job/job_location/:id',
  headers: { 
    'Authorization': 'Bearer accessToken'
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

> The above command returns JSON structured like this:

```json
{
    "status": 200,
    "data": {
        "_id": "63ca6989d7d8e33504044067",
        "street_address": "Gulshan",
        "city": "Karachi",
        "state": "Sindh",
        "country": "Pakistan",
        "zip": "75300",
        "delete_status": false,
        "createdAt": "2023-01-20T10:14:33.510Z",
        "updatedAt": "2023-01-20T10:14:33.510Z",
        "__v": 0
    }
}
```

This endpoint fetches a specific job location

### HTTP Request

`GET {{BASE_URL}}/job/job_location/:id`

### URL Parameters

Parameter | Required | Description
--------- | -------- | -----------
id | True | The ID of the job location that is stored in database to fetch




## Create a job location

```ruby
require "uri"
require "json"
require "net/http"

url = URI("{{BASE_URL}}/job/job_location")

http = Net::HTTP.new(url.host, url.port);
request = Net::HTTP::Post.new(url)
request["Authorization"] = "Bearer accessToken"
request["Content-Type"] = "application/json"
request.body = JSON.dump({
  "street_address": "Gulshan",
  "city": "Karachi",
  "state": "Sindh",
  "country": "Pakistan",
  "zip": "75300"
})

response = http.request(request)
puts response.read_body
```

```python
import requests
import json

url = "{{BASE_URL}}/job/job_location"

payload = json.dumps({
  "street_address": "Gulshan",
  "city": "Karachi",
  "state": "Sindh",
  "country": "Pakistan",
  "zip": "75300"
})
headers = {
  'Authorization': 'Bearer accessToken',
  'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)
```

```shell
curl --location -g '{{BASE_URL}}/job/job_location' \
--header 'Authorization: Bearer accessToken' \
--header 'Content-Type: application/json' \
--data '{
  "street_address": "Gulshan",
  "city": "Karachi",
  "state": "Sindh",
  "country": "Pakistan",
  "zip": "75300"
}'
```

```javascript
var axios = require('axios');
var data = JSON.stringify({
  "street_address": "Gulshan",
  "city": "Karachi",
  "state": "Sindh",
  "country": "Pakistan",
  "zip": "75300"
});

var config = {
  method: 'post',
maxBodyLength: Infinity,
  url: '{{BASE_URL}}/job/job_location',
  headers: { 
    'Authorization': 'Bearer accessToken', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

```

> The above command returns JSON structured like this:

```json
{
    "status": 201,
    "message": "Created"
}
```

This endpoint creates a job location

### HTTP Request

`POST {{BASE_URL}}/job/job_location`



### Body Parameters

Parameter | Data type | Required | Restrictions | Description
--------- | --------- | -------- | ------------ | -----------
street_address | String | True | None | The street_address of the location.
city | String | True | True | The city of the location.
state | String | True | True | The state of the location.
country | String | True | None | The country of the location.
zip | String | True | None | The zip code of the location.


<!-- ## Update product

```ruby
require "uri"
require "json"
require "net/http"

url = URI("{{BASE_URL}}/products/:id")

http = Net::HTTP.new(url.host, url.port);
request = Net::HTTP::Patch.new(url)
request["Authorization"] = "Bearer accessToken"
request["Content-Type"] = "application/json"
request.body = JSON.dump({
  "name": "Dummy product",
  "status": "available",
  "category": "Category",
  "price": 100,
  "quantity": 0,
  "stockQuantity": 0,
  "unitOfMeasure": "perEach",
  "productImage": [
    {
      "name": "name.jpg",
      "url": "https://url.com"
    },
    {
      "name": "name.jpg",
      "url": "https://url.com"
    }
  ]
})

response = http.request(request)
puts response.read_body
```

```python
import requests
import json

url = "{{BASE_URL}}/products/:id"

payload = json.dumps({
  "name": "Dummy product",
  "status": "available",
  "category": "Category",
  "price": 100,
  "quantity": 0,
  "stockQuantity": 0,
  "unitOfMeasure": "perEach",
  "productImage": [
    {
      "name": "name.jpg",
      "url": "https://url.com"
    },
    {
      "name": "name.jpg",
      "url": "https://url.com"
    }
  ]
})
headers = {
  'Authorization': 'Bearer accessToken',
  'Content-Type': 'application/json'
}

response = requests.request("PATCH", url, headers=headers, data=payload)

print(response.text)
```

```shell
curl --location -g --request PATCH '{{BASE_URL}}/products/:id' \
--header 'Authorization: Bearer accessToken' \
--header 'Content-Type: application/json' \
--data '{
    "name": "Dummy product",
    "status": "available",
    "category": "Category",
    "price": 100,
    "quantity": 0,
    "stockQuantity": 0,
    "unitOfMeasure": "perEach",
    "productImage": [
        {
            "name": "name.jpg",
            "url": "https://url.com"
        },
        {
            "name": "name.jpg",
            "url": "https://url.com"
        }
    ]
}'
```

```javascript
var axios = require('axios');
var data = JSON.stringify({
  "name": "Dummy product",
  "status": "available",
  "category": "Category",
  "price": 100,
  "quantity": 0,
  "stockQuantity": 0,
  "unitOfMeasure": "perEach",
  "productImage": [
    {
      "name": "name.jpg",
      "url": "https://url.com"
    },
    {
      "name": "name.jpg",
      "url": "https://url.com"
    }
  ]
});

var config = {
  method: 'patch',
maxBodyLength: Infinity,
  url: '{{BASE_URL}}/products/:id',
  headers: { 
    'Authorization': 'Bearer accessToken', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

> The above command returns JSON structured like this:

```json
  {
    "status": 200,
    "data": "Product updated successfully"
  }
```


This endpoint updates a product

### HTTP Request

`PATCH {{BASE_URL}}/products/:id`

### URL Parameters

Parameter | Required | Description
--------- | -------- | -----------
id | True | The ID of the product that is stored in database to update

### Body Parameters

Parameter | Data type | Required | Restrictions | Description
--------- | --------- | -------- | ------------ | -----------
name | String | True | None | The name of the product
status | String | True | Enum: [available, outOfStock] | The availability status of the product. Possible values are "available" and "outOfStock"
category | String | True | None | The category of the product
price | Number | False | None | The price of the product
quantity | Number | False | None | The quantity of the product
stockQuantity | Number | False | None | The stock quantity of the product
productImage | Array | False | None | An array of objects that contain information about product images
productImage.name	 | String | False | None | The name of the product image
productImage.url | String | False | None | The URL of the product image


## Delete product

```ruby
require "uri"
require "net/http"

url = URI("{{BASE_URL}}/products/:id")

http = Net::HTTP.new(url.host, url.port);
request = Net::HTTP::Delete.new(url)
request["Authorization"] = "Bearer accessToken"

response = http.request(request)
puts response.read_body
```

```python
import requests

url = "{{BASE_URL}}/products/:id"

payload={}
headers = {
  'Authorization': 'Bearer accessToken'
}

response = requests.request("DELETE", url, headers=headers, data=payload)

print(response.text)
```

```shell
curl --location -g --request DELETE '{{BASE_URL}}/products/:id' \
--header 'Authorization: Bearer accessToken'
```

```javascript
var axios = require('axios');

var config = {
  method: 'delete',
maxBodyLength: Infinity,
  url: '{{BASE_URL}}/products/:id',
  headers: { 
    'Authorization': 'Bearer accessToken'
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

> The above command returns JSON structured like this:

```json
  {
    "status": 200,
    "data": "Product deleted successfully"
  }
```


This endpoint deletes a product

### HTTP Request

`DELETE {{BASE_URL}}/products/:id`


### URL Parameters

Parameter | Required | Description
--------- | -------- | -----------
id | True | The ID of the product that is stored in database to delete





## Upload product images

```ruby
require "uri"
require "net/http"

url = URI("{{BASE_URL}}/products/upload")

http = Net::HTTP.new(url.host, url.port);
request = Net::HTTP::Post.new(url)
request["Authorization"] = "Bearer accessToken"
form_data = [['productImage', File.open('image.jpg')]]
request.set_form form_data, 'multipart/form-data'
response = http.request(request)
puts response.read_body
```

```python
import requests

url = "{{BASE_URL}}/products/upload"

payload={}
files=[
  ('productImage',('image.jpg',open('image.jpg','rb'),'image/jpeg'))
]
headers = {
  'Authorization': 'Bearer accessToken'
}

response = requests.request("POST", url, headers=headers, data=payload, files=files)

print(response.text)
```

```shell
curl --location -g '{{BASE_URL}}/products/upload' \
--header 'Authorization: Bearer accessToken' \
--form 'productImage=@"image.jpg"'
```

```javascript
var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
var data = new FormData();
data.append('productImage', fs.createReadStream('image.jpg'));

var config = {
  method: 'post',
maxBodyLength: Infinity,
  url: '{{BASE_URL}}/products/upload',
  headers: { 
    'Authorization': 'Bearer accessToken', 
    ...data.getHeaders()
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

> The above command returns JSON structured like this:

```json
  "status": 200,        
  "data": [
    {
    "filename": "name",
    "url": "url"
  }
  ]
```


This endpoint uploads product images

### HTTP Request

`POST {{BASE_URL}}/products/upload`



### Body Parameters

Parameter | Data type | Required | Restrictions | Description
--------- | --------- | -------- | ------------ | -----------
productImage | media | True | Max limit: 5, Allowed types: .jpeg, .png, .jpg | The images of the product should be in .png, .jpeg, .jpg format and should not be more than 5 files -->


# Job posts

## Get all posted jobs

```ruby
require "uri"
require "net/http"

url = URI("{{BASE_URL}}/job/job_post")

http = Net::HTTP.new(url.host, url.port);
request = Net::HTTP::Get.new(url)
request["Authorization"] = "Bearer accessToken"

response = http.request(request)
puts response.read_body
```

```python
import requests

url = "{{BASE_URL}}/job/job_post"

payload={}
headers = {
  'Authorization': 'Bearer accessToken'
}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)
```

```shell
curl --location -g '{{BASE_URL}}/job/job_post' \
--header 'Authorization: Bearer accessToken'
```

```javascript
var axios = require('axios');

var config = {
  method: 'get',
maxBodyLength: Infinity,
  url: '{{BASE_URL}}/job/job_post',
  headers: { 
    'Authorization': 'Bearer accessToken'
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

> The above command returns JSON structured like this:

```json
{
    "status": 200,
    "data": {
        "docs": [
            {
                "_id": "6423e002857845552870ee47",
                "created_date": "2023-03-29T06:37:11.068Z",
                "job_category_id": {
                    "name": "Marketing"
                },
                "job_title": "Marketer management",
                "job_status": "active",
                "job_shift": "night",
                "job_type": "full-time",
                "locations": [
                    {
                        "street_address": "Gulshan",
                        "city": "Karachi",
                        "state": "Sindh",
                        "country": "Pakistan",
                        "zip": "75300"
                    }
                ],
                "job_location_type": "remote",
                "experience": "<10year"
            },
            {
                "_id": "6423e059857845552870ee49",
                "created_date": "2023-03-29T06:37:11.068Z",
                "job_category_id": {
                    "name": "UI/UX Designing"
                },
                "job_title": "UI/UX dev",
                "job_status": "active",
                "job_shift": "night",
                "job_type": "full-time",
                "locations": [
                    {
                        "street_address": "Gulshan",
                        "city": "Karachi",
                        "state": "Sindh",
                        "country": "Pakistan",
                        "zip": "75300"
                    },
                    {
                        "street_address": "PECHS",
                        "city": "Lahore",
                        "state": "Punjab",
                        "country": "Pakistan",
                        "zip": "75300"
                    }
                ],
                "job_location_type": "remote",
                "experience": "<10year"
            },
            {
                "_id": "642a6ce9fa7a6f4c7442ff03",
                "created_date": "2023-04-03T05:33:53.739Z",
                "job_category_id": {
                    "name": "Software Development"
                },
                "job_title": "JAVA developer",
                "job_status": "active",
                "job_shift": "morning",
                "job_type": "full-time",
                "locations": [
                    {
                        "street_address": "PECHS",
                        "city": "Lahore",
                        "state": "Punjab",
                        "country": "Pakistan",
                        "zip": "75300"
                    }
                ],
                "job_location_type": "on-site",
                "experience": "1-3year"
            },
            {
                "_id": "642a6d6afa7a6f4c7442ff08",
                "created_date": "2023-04-03T05:33:53.739Z",
                "job_category_id": {
                    "name": "Software Development"
                },
                "job_title": "CSharp developer",
                "job_status": "active",
                "job_shift": "night",
                "job_type": "part-time",
                "locations": [
                    {
                        "street_address": "PECHS",
                        "city": "Lahore",
                        "state": "Punjab",
                        "country": "Pakistan",
                        "zip": "75300"
                    }
                ],
                "job_location_type": "on-site",
                "experience": "1-3year"
            },
            {
                "_id": "642a6daffa7a6f4c7442ff0b",
                "created_date": "2023-04-03T05:33:53.739Z",
                "job_category_id": {
                    "name": "Software Development"
                },
                "job_title": "react developer",
                "job_status": "active",
                "job_shift": "night",
                "job_type": "intern",
                "locations": [
                    {
                        "street_address": "PECHS",
                        "city": "Lahore",
                        "state": "Punjab",
                        "country": "Pakistan",
                        "zip": "75300"
                    }
                ],
                "job_location_type": "on-site",
                "experience": "0-1year"
            },
            {
                "_id": "642a6ed2fa7a6f4c7442ff28",
                "created_date": "2023-04-03T05:33:53.739Z",
                "job_title": "Tester",
                "job_shift": "evening",
                "job_type": "part-time",
                "job_location_type": "on-site",
                "experience": "1-3year",
                "job_category_id": {
                    "name": "Software Development"
                },
                "job_status": "active",
                "locations": []
            }
        ],
        "totalDocs": 6,
        "limit": 10,
        "page": 1,
        "totalPages": 1,
        "pagingCounter": 1,
        "hasPrevPage": false,
        "hasNextPage": false,
        "prevPage": null,
        "nextPage": null
    }
}
```

This endpoint fetches all the orders based on the role assigned to the logged in user

### HTTP Request

`GET {{BASE_URL}}/job/job_post`



### Query Parameters

Parameter | Description
--------- | -----------
job_title | Title of the job.
job_type | Type of the job.
experience | Experience of job.
job_category | Category of the job.
page | Page no. to navigate at.
perPage | Total no. of documents you want to show on a page.




## Get specific job post

```ruby
require "uri"
require "net/http"

url = URI("{{BASE_URL}}/job/job_post/:id")

http = Net::HTTP.new(url.host, url.port);
request = Net::HTTP::Get.new(url)
request["Authorization"] = "Bearer accessToken"

response = http.request(request)
puts response.read_body
```

```python
import requests

url = "{{BASE_URL}}/job/job_post/:id"

payload={}
headers = {
  'Authorization': 'Bearer accessToken'
}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)
```

```shell
curl --location -g '{{BASE_URL}}/job/job_post/:id' \
--header 'Authorization: Bearer accessToken'
```

```javascript
var axios = require('axios');

var config = {
  method: 'get',
maxBodyLength: Infinity,
  url: '{{BASE_URL}}/job/job_post/:id',
  headers: { 
    'Authorization': 'Bearer accessToken'
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

> The above command returns JSON structured like this:

```json
{
    "status": 200,
    "data": {
        "created_date": "2023-03-29T06:37:11.068Z",
        "publish_status": "draft",
        "_id": "6423e002857845552870ee47",
        "job_category_id": "6421383ad151690cd0044d7a",
        "job_title": "Marketer management",
        "job_status": "active",
        "job_shift": "night",
        "job_type": "full-time",
        "locations": [
            {
                "_id": "6423e002857845552870ee48",
                "job_location_id": {
                    "_id": "63ca6989d7d8e33504044067",
                    "street_address": "Gulshan",
                    "city": "Karachi",
                    "state": "Sindh",
                    "country": "Pakistan",
                    "zip": "75300"
                }
            }
        ],
        "job_location_type": "remote",
        "experience": "<10year",
        "job_description": "Full stack dev having 2+ years of experience in php, python, js domains.",
        "is_company_name_hidden": false,
        "skills": [],
        "posted_by_id": "63c8dcba1e1396226c6a16d8",
        "company_id": {
            "_id": "63c8dcba1e1396226c6a16d9",
            "company_name": "kaispe",
            "company_website_url": "google.com"
        }
    }
}
```

This endpoint fetches a specific posted job

### HTTP Request

`GET {{BASE_URL}}/job/job_post/:id`

### URL Parameters

Parameter | Description
--------- | -----------
id | The id of the job post


## Create a job post

```ruby
require "uri"
require "json"
require "net/http"

url = URI("{{BASE_URL}}/job/job_post")

http = Net::HTTP.new(url.host, url.port);
request = Net::HTTP::Post.new(url)
request["Authorization"] = "Bearer accessToken"
request["Content-Type"] = "application/json"
request.body = JSON.dump({
    "job_category_id": "63ee10298e476d4c5c9dae2b",
    "job_title": "react developer",
    "job_status": "active",
    "skills": [
        {
            "skill_level": 2,
            "skill_set_id": "63e499cef9052325d02cf428"
        }
    ],
    "job_shift": "night",
    "job_type": "intern",
    "locations": [
        {
            "job_location_id": "6423e1b7a58211f14c4e4d43"
        }
    ],
    "job_location_type": "on-site",
    "experience": "0-1year",
    "job_description": "Full stack dev having 0-1 years of experience in jsx, babel, javascript.",
    "is_company_name_hidden": false
})

response = http.request(request)
puts response.read_body
```

```python
import requests
import json

url = "{{BASE_URL}}/job/job_post"

payload = json.dumps({
    "job_category_id": "63ee10298e476d4c5c9dae2b",
    "job_title": "react developer",
    "job_status": "active",
    "skills": [
        {
            "skill_level": 2,
            "skill_set_id": "63e499cef9052325d02cf428"
        }
    ],
    "job_shift": "night",
    "job_type": "intern",
    "locations": [
        {
            "job_location_id": "6423e1b7a58211f14c4e4d43"
        }
    ],
    "job_location_type": "on-site",
    "experience": "0-1year",
    "job_description": "Full stack dev having 0-1 years of experience in jsx, babel, javascript.",
    "is_company_name_hidden": false
})
headers = {
  'Authorization': 'Bearer accessToken',
  'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)
```

```shell
curl --location -g '{{BASE_URL}}/job/job_post' \
--header 'Authorization: Bearer accessToken' \
--header 'Content-Type: application/json' \
--data '{
    "job_category_id": "63ee10298e476d4c5c9dae2b",
    "job_title": "react developer",
    "job_status": "active",
    "skills": [
        {
            "skill_level": 2,
            "skill_set_id": "63e499cef9052325d02cf428"
        }
    ],
    "job_shift": "night",
    "job_type": "intern",
    "locations": [
        {
            "job_location_id": "6423e1b7a58211f14c4e4d43"
        }
    ],
    "job_location_type": "on-site",
    "experience": "0-1year",
    "job_description": "Full stack dev having 0-1 years of experience in jsx, babel, javascript.",
    "is_company_name_hidden": false
}'
```

```javascript
var axios = require('axios');
var data = JSON.stringify({
    "job_category_id": "63ee10298e476d4c5c9dae2b",
    "job_title": "react developer",
    "job_status": "active",
    "skills": [
        {
            "skill_level": 2,
            "skill_set_id": "63e499cef9052325d02cf428"
        }
    ],
    "job_shift": "night",
    "job_type": "intern",
    "locations": [
        {
            "job_location_id": "6423e1b7a58211f14c4e4d43"
        }
    ],
    "job_location_type": "on-site",
    "experience": "0-1year",
    "job_description": "Full stack dev having 0-1 years of experience in jsx, babel, javascript.",
    "is_company_name_hidden": false
});

var config = {
  method: 'post',
maxBodyLength: Infinity,
  url: '{{BASE_URL}}/job/job_post',
  headers: { 
    'Authorization': 'Bearer accessToken', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

> The above command returns JSON structured like this:

```json
{
    "status": 200,
    "data": "Created"
}
```

This endpoint creates a job post.

### HTTP Request

`POST {{BASE_URL}}/job/job_post`



### Body Parameters

Parameter | Data type | Required | Restrictions | Description
--------- | --------- | -------- | ------------ | -----------
job_category_id | String | True | Valid | The id of the job category.
job_title | String | True | None | The title of the job. 
job_status | String | True | enum: ["active", "unactive"] | The status of the job
skills.skill_level | Number | True | None | The level of the skill
skills.skill_set_id | String | True | Valid | The id of the skills 
job_shift | String | True | enum: ["morning", "evening", "night"] | The shift of the job
job_type | String | True | enum: ["full-time", "part-time", "contract", "temporary", "freelancer", "intern", "on-call", "visiting"] | The type of the job
locations.job_location_id | String | True | Valid | The location id of the job
job_location_type | String | True | enum: ["on-site", "hybrid", "remote"] | The location type of the job
experience | String | True |  enum: ["0-1year", "1-3year", "<5year", "<10year"] | The experience of the job
job_description | String | True | None | The description of the job

<!-- ## Update order

```ruby
require "uri"
require "json"
require "net/http"

url = URI("{{BASE_URL}}/order-management/:id")

http = Net::HTTP.new(url.host, url.port);
request = Net::HTTP::Patch.new(url)
request["Authorization"] = "Bearer accessToken"
request["Content-Type"] = "application/json"
request.body = JSON.dump({
  "orderStatus": "packing",
  "saveAs": "save",
  "shippingAddress": {
    "name": "person",
    "phone": "+92XXXXXXXXXXX",
    "address": "address"
  },
  "buyerDetails": {
    "name": "person",
    "phone": "+92XXXXXXXXXXX",
    "address": "address"
  },
  "description": "Description of order"
})

response = http.request(request)
puts response.read_body
```

```python
import requests
import json

url = "{{BASE_URL}}/order-management/:id"

payload = json.dumps({
  "orderStatus": "packing",
  "saveAs": "save",
  "shippingAddress": {
    "name": "person",
    "phone": "+92XXXXXXXXXXX",
    "address": "address"
  },
  "buyerDetails": {
    "name": "person",
    "phone": "+92XXXXXXXXXXX",
    "address": "address"
  },
  "description": "Description of order"
})
headers = {
  'Authorization': 'Bearer accessToken',
  'Content-Type': 'application/json'
}

response = requests.request("PATCH", url, headers=headers, data=payload)

print(response.text)
```

```shell
curl --location -g --request PATCH '{{BASE_URL}}/order-management/:id' \
--header 'Authorization: Bearer accessToken' \
--header 'Content-Type: application/json' \
--data '{
    "orderStatus": "packing",
    "saveAs": "save",
    "shippingAddress": {
      "name": "person",
      "phone": "+92XXXXXXXXXXX",
      "address": "address"
    },
    "buyerDetails": {
      "name": "person",
      "phone": "+92XXXXXXXXXXX",
      "address": "address"
    },
    "description": "Description of order"
}'
```

```javascript
var axios = require('axios');
var data = JSON.stringify({
  "orderStatus": "packing",
  "saveAs": "save",
  "shippingAddress": {
    "name": "person",
    "phone": "+92XXXXXXXXXXX",
    "address": "address"
  },
  "buyerDetails": {
    "name": "person",
    "phone": "+92XXXXXXXXXXX",
    "address": "address"
  },
  "description": "Description of order"
});

var config = {
  method: 'patch',
maxBodyLength: Infinity,
  url: '{{BASE_URL}}/order-management/:id',
  headers: { 
    'Authorization': 'Bearer accessToken', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

> The above command returns JSON structured like this:

```json
{
  "message": "Updated successfully"
}
```

This endpoint updates an order.

### HTTP Request

`PATCH {{BASE_URL}}/order-management/:id`



### URL Parameters

Parameter | Description
--------- | -----------
id | The id of the order stored in database

### Body Parameters

Parameter | Data type | Required | Restrictions | Description
--------- | --------- | -------- | ------------ | -----------
orderStatus | String | True | Enum: ["approved", "cancelled", "approval", "processing", "packing", "shipping", "delivered"] | The current status of the order. Default value is "approval"
saveAs | String | True | Enum: ["save", "draft"] | Whether to save the order or as a draft
shippingAddress | Object | True | None | The shipping address for the order
shippingAddress.name | String | True | None | The name of the person receiving the order
shippingAddress.phone | String | True | None | The phone number of the person receiving the order
shippingAddress.address | String | True | None | The address of the person receiving the order
buyerDetails | Object | True | None | The details of the buyer
buyerDetails.name | String | True | None | The name of the person receiving the order
buyerDetails.phone | String | True | None | The phone number of the person receiving the order
buyerDetails.address | String | True | None | The address of the person receiving the order
description | String | False | None | The description of the order



## Delete order

```ruby
require "uri"
require "net/http"

url = URI("{{BASE_URL}}/order-management/:id")

http = Net::HTTP.new(url.host, url.port);
request = Net::HTTP::Delete.new(url)
request["Authorization"] = "Bearer accessToken"

response = http.request(request)
puts response.read_body
```

```python
import requests

url = "{{BASE_URL}}/order-management/:id"

payload={}
headers = {
  'Authorization': 'Bearer accessToken'
}

response = requests.request("DELETE", url, headers=headers, data=payload)

print(response.text)
```

```shell
curl --location -g --request DELETE '{{BASE_URL}}/order-management/:id' \
--header 'Authorization: Bearer accessToken'
```

```javascript
var axios = require('axios');

var config = {
  method: 'delete',
maxBodyLength: Infinity,
  url: '{{BASE_URL}}/order-management/:id',
  headers: { 
    'Authorization': 'Bearer accessToken'
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

> The above command returns JSON structured like this:

```json
{
  "message": "Deleted successfully"
}
```

This endpoint deletes an order.

### HTTP Request

`DELETE {{BASE_URL}}/order-management/:id`

### URL Parameters

Parameter | Description
--------- | -----------
id | The id of the order stored in database

## Export all orders

```ruby
require "uri"
require "net/http"

url = URI("{{BASE_URL}}/order-management/export/AllOrders")

http = Net::HTTP.new(url.host, url.port);
request = Net::HTTP::Get.new(url)
request["Authorization"] = "Bearer accessToken"

response = http.request(request)
puts response.read_body
```

```python
import requests

url = "{{BASE_URL}}/order-management/export/AllOrders"

payload={}
headers = {
  'Authorization': 'Bearer accessToken'
}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)
```

```shell
curl --location -g '{{BASE_URL}}/order-management/export/AllOrders' \
--header 'Authorization: Bearer accessToken'
```

```javascript
var axios = require('axios');

var config = {
  method: 'get',
maxBodyLength: Infinity,
  url: '{{BASE_URL}}/order-management/export/AllOrders',
  headers: { 
    'Authorization': 'Bearer accessToken'
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

> The above command returns JSON structured like this:

```json
{
[
    {
        "orderStatus": "approval",
        "_id": "63ff23679976ec3960a5b539",
        "totalAmount": 100,
        "totalQuantity": 4,
        "expectedDeliveryDate": "2023-03-11T10:05:27.174Z",
        "orderPlaced": "2023-02-02T10:05:27.174Z",
        "orderId": "OID1"
    },
    {
        "orderStatus": "approval",
        "_id": "63ff23db45c54d4efc38540a",
        "totalAmount": 125,
        "totalQuantity": 5,
        "expectedDeliveryDate": "2023-03-11T10:07:23.640Z",
        "orderPlaced": "2023-03-01T10:07:23.640Z",
        "orderId": "OID2"
    }
]
}
```

This endpoint fetches all the orders.

### HTTP Request

`GET {{BASE_URL}}/order-management/export/AllOrders`




 -->

  <!-- # Contact


  ## Upload contact images

  ```ruby
  require "uri"
  require "net/http"

  url = URI("{{BASE_URL}}/contact/upload")

  http = Net::HTTP.new(url.host, url.port);
  request = Net::HTTP::Post.new(url)
  request["Authorization"] = "Bearer accessToken"
  form_data = [['contactImages', File.open('image.jpg')]]
  request.set_form form_data, 'multipart/form-data'
  response = http.request(request)
  puts response.read_body
  ```

  ```python
  import requests

  url = "{{BASE_URL}}/contact/upload"

  payload={}
  files=[
    ('contactImages',('image.jpg',open('image.jpg','rb'),'image/jpeg'))
  ]
  headers = {
    'Authorization': 'Bearer accessToken'
  }

  response = requests.request("POST", url, headers=headers, data=payload, files=files)

  print(response.text)
  ```

  ```shell
  curl --location -g '{{BASE_URL}}/contact/upload' \
  --header 'Authorization: Bearer accessToken' \
  --form 'contactImages=@"image.jpg"'
  ```

  ```javascript
  var axios = require('axios');
  var FormData = require('form-data');
  var fs = require('fs');
  var data = new FormData();
  data.append('contactImages', fs.createReadStream('image.jpg'));

  var config = {
    method: 'post',
  maxBodyLength: Infinity,
    url: '{{BASE_URL}}/contact/upload',
    headers: { 
      'Authorization': 'Bearer accessToken', 
      ...data.getHeaders()
    },
    data : data
  };

  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
  ```

  > The above command returns JSON structured like this:

  ```json
    "data": [
      {
      "filename": "name",
      "url": "url"
    }
    ]
  ```


  This endpoint uploads product images

  ### HTTP Request

  `POST {{BASE_URL}}/contact/upload`



  ### Body Parameters

  Parameter | Data type | Required | Restrictions | Description
  --------- | --------- | -------- | ------------ | -----------
  contactImages | media | True | Max limit: 5, Allowed types: .jpeg, .png, .jpg | The images of the contact should be in .png, .jpeg, .jpg format and should not be more than 5 files


  ## Create contact

  ```ruby
  require "uri"
  require "json"
  require "net/http"

  url = URI("{{BASE_URL}}/contact/upload")

  http = Net::HTTP.new(url.host, url.port);
  request = Net::HTTP::Post.new(url)
  request["Authorization"] = "Bearer accessToken"
  request["Content-Type"] = "application/json"
  request.body = JSON.dump({
    "title": "title",
    "content": "content",
    "caption": "caption",
    "images": [
      {
        "filename": "name",
        "url": "https://url"
      },
      {
        "filename": "name",
        "url": "https://url"
      }
    ]
  })

  response = http.request(request)
  puts response.read_body
  ```

  ```python
  import requests
  import json

  url = "{{BASE_URL}}/contact/upload"

  payload = json.dumps({
    "title": "title",
    "content": "content",
    "caption": "caption",
    "images": [
      {
        "filename": "name",
        "url": "https://url"
      },
      {
        "filename": "name",
        "url": "https://url"
      }
    ]
  })
  headers = {
    'Authorization': 'Bearer accessToken',
    'Content-Type': 'application/json'
  }

  response = requests.request("POST", url, headers=headers, data=payload)

  print(response.text)
  ```

  ```shell
  curl --location -g '{{BASE_URL}}/contact/upload' \
  --header 'Authorization: Bearer accessToken' \
  --header 'Content-Type: application/json' \
  --data '{
      "title": "title",
      "content": "content",
      "caption": "caption",
      "images": [
          {
          "filename": "name",
          "url": "https://url"
          },
                  {
          "filename": "name",
          "url": "https://url"
          }
      ]
      
  }'
  ```

  ```javascript
  var axios = require('axios');
  var data = JSON.stringify({
    "title": "title",
    "content": "content",
    "caption": "caption",
    "images": [
      {
        "filename": "name",
        "url": "https://url"
      },
      {
        "filename": "name",
        "url": "https://url"
      }
    ]
  });

  var config = {
    method: 'post',
  maxBodyLength: Infinity,
    url: '{{BASE_URL}}/contact/upload',
    headers: { 
      'Authorization': 'Bearer accessToken', 
      'Content-Type': 'application/json'
    },
    data : data
  };

  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
  ```

  > The above command returns JSON structured like this:

  ```json
  {
    "status": 201,
    "message": "Record created successfully"
  }
  ```

  This endpoint posts contact form.

  ### HTTP Request

  `POST {{BASE_URL}}/contact`



  ### Body Parameters

  Parameter | Data type | Required | Restrictions | Description
  --------- | --------- | -------- | ------------ | -----------
  title | String | True | None | The title of the contact form
  content | String | True | None | The content of the contact form
  caption | String | True | None | The caption of the contact form
  images | Array | True | None | An array of contact images
  images.filename | String | True | None | Filename of image
  images.url | String | True | None | Url of image
  -->

# REST API FileManagementServer

This is a file management application providing a REST
API to upload and delete file globally.

File management application is deployed on https://global-file-upload.herokuapp.com/

## Install

    npm install

## Run the app

    npm start
    

# REST API

The REST API to the example app is described below.

## Signup route

### Request

`POST /signup`

    curl --location --request POST 'https://global-file-upload.herokuapp.com/signup' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "username":"rohan kumar jain",
        "email":"rohan@gmail.com",
        "password":"abc",
        "confpassword":"abc"
    }'

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    {"msg": "User Registerd Successfully"}

## Login route

### Request

`GET /login`

    curl --location --request GET 'https://global-file-upload.herokuapp.com/login' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "email":"rohan@gmail.com",
        "password":"abc"
    }'

### Response

    HTTP/1.1 201 Created
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 201 Created
    Connection: close
    Content-Type: application/json
    Location: /thing/1
    Content-Length: 36

    {"token":"abc"}


## Gets all file uploaded by particular user

### Request

`GET /file`

    curl --location --request GET 'https://global-file-upload.herokuapp.com/file' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDI5NGY1MzQ2NmY2NjAwMjJjODFmNGEiLCJ1c2VybmFtZSI6InJvaGFuIGt1bWFyIGphaW4iLCJlbWFpbCI6InJvaGFuQGdtYWlsLmNvbSIsImlhdCI6MTYxMzMyMDE4MiwiZXhwIjoxNjEzMzM4MTgyfQ.6ZlPsT4UeVD-RJNRNYDIuI4s58rJLdCfR04s_V5RzF4'

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 36

    {
        "msg": [
            {
                "_id": "6029505c466f660022c81f4b",
                "user_id": "60294f53466f660022c81f4a",
                "file_name": "IMG_b8d9rd.jpg",
                "link": "https://freebucket.s3.amazonaws.com/IMG_b8d9rd.jpg",
                "__v": 0
            }
        ]
    }

## Upload file route

### Request

`POST /upload-file`
    
    curl --location --request POST 'https://global-file-upload.herokuapp.com/upload-file' \
    --header 'Authorization: Bearer         eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDI5NGY1MzQ2NmY2NjAwMjJjODFmNGEiLCJ1c2VybmFtZSI6InJvaGFuIGt1bWFyIGphaW4iLCJlbWFpbCI6InJvaGFuQGdtYWlsLmNvbSIsImlhdCI6MTYxMzMyMDE4MiwiZXhwIjoxNjEzMzM4MTgyfQ.6ZlPsT4UeVD-RJNRNYDIuI4s58rJLdCfR04s_V5RzF4' \
    --form 'file=@"/home/rohan_kumar_jain/Downloads/IMG_b8d9rd.jpg"'

### Response

    HTTP/1.1 404 Not Found
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 404 Not Found
    Connection: close
    Content-Type: application/json
    Content-Length: 35

    {
        "msg": {
            "_id": "6029505c466f660022c81f4b",
            "user_id": "60294f53466f660022c81f4a",
            "file_name": "IMG_b8d9rd.jpg",
            "link": "https://freebucket.s3.amazonaws.com/IMG_b8d9rd.jpg",
            "__v": 0
        }
    }

## Delete file route

### Request

`DELETE /delete-file`

    curl --location --request DELETE 'https://global-file-upload.herokuapp.com/delete-file' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDI5NGY1MzQ2NmY2NjAwMjJjODFmNGEiLCJ1c2VybmFtZSI6InJvaGFuIGt1bWFyIGphaW4iLCJlbWFpbCI6InJvaGFuQGdtYWlsLmNvbSIsImlhdCI6MTYxMzMyMDE4MiwiZXhwIjoxNjEzMzM4MTgyfQ.6ZlPsT4UeVD-RJNRNYDIuI4s58rJLdCfR04s_V5RzF4' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "fileName":"IMG_b8d9rd.jpg"
    }'

### Response

    HTTP/1.1 201 Created
    Date: Thu, 24 Feb 2011 12:36:31 GMT
    Status: 201 Created
    Connection: close
    Content-Type: application/json
    Location: /thing/2
    Content-Length: 35

    {
        "msg": "File Successfully Deleted!"
    }

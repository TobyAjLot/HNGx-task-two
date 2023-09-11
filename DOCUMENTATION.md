# Person API Documentation

Welcome to the Person API documentation. This API allows you to manage person records stored in a MongoDB database. Below, you will find details on how to use the API, including request and response formats, sample usage, known limitations, and deployment instructions.

## Table of Contents

- [Person API Documentation](#person-api-documentation)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Standard Request and Response Formats](#standard-request-and-response-formats)
    - [Request Format](#request-format)
    - [Response Format](#response-format)
  - [API Endpoints](#api-endpoints)
    - [Get All People](#get-all-people)
    - [Get Person by ID](#get-person-by-id)
    - [Create a New Person](#create-a-new-person)
    - [Update a Person](#update-a-person)
    - [Delete a Person](#delete-a-person)
  - [Sample Usage](#sample-usage)
    - [Get All People](#get-all-people-1)
    - [Create a New Person](#create-a-new-person-1)
    - [Update a Person](#update-a-person-1)
    - [Delete a Person](#delete-a-person-1)
  - [Known Limitations](#known-limitations)
  - [Local Setup and Deployment](#local-setup-and-deployment)

## Introduction

The Person API provides basic CRUD (Create, Read, Update, Delete) operations for managing person records. It uses a MongoDB database to store and retrieve data. Below, you'll find information about the API's endpoints and how to use them.

## Standard Request and Response Formats

The API follows standard JSON formats for requests and responses. Here are the expected formats:

### Request Format

- Content-Type: application/json

### Response Format

- Content-Type: application/json
- Status Codes:
  - 200 OK: Successful request.
  - 201 Created: Successful resource creation.
  - 400 Bad Request: Invalid request or data.
  - 404 Not Found: Resource not found.
  - 500 Internal Server Error: Server error.

## API Endpoints

### Get All People

- **Endpoint**: `/api/people`
- **Method**: GET
- **Description**: Retrieves a list of all people in the database.

### Get Person by ID

- **Endpoint**: `/api/:user_id`
- **Method**: GET
- **Description**: Retrieves a specific person by their ID.

### Create a New Person

- **Endpoint**: `/api`
- **Method**: POST
- **Description**: Creates a new person in the database.

### Update a Person

- **Endpoint**: `/api/:user_id`
- **Method**: PUT
- **Description**: Updates a person's information by their ID.

### Delete a Person

- **Endpoint**: `/api/:user_id`
- **Method**: DELETE
- **Description**: Deletes a person by their ID.

## Sample Usage

Here are some sample API requests and expected responses:

### Get All People

**Request:**

```json
GET /api/people
```

**Response (200 OK):**

```json
[
  {
    "id": 1,
    "name": "Harry Potter"
  },
  {
    "id": 2,
    "name": "Hermione Granger"
  }
]
```

### Create a New Person

**Request:**

```json
POST /api
{
  "name": "Alice Johnson"
}
```

**Response (201 Created):**

```json
{
  "id": 3,
  "name": "Alice Johnson"
}
```

### Update a Person

**Request:**

```json
PUT /api/2
{
  "name": "Updated Name"
}
```

**Response (200 OK):**

```json
{
  "id": 2,
  "name": "Updated Name"
}
```

### Delete a Person

**Request:**

```json
DELETE /api/3
```

**Response (200 OK):**

```json
{
  "message": "Person deleted successfully"
}
```

## Known Limitations

- The API assumes that the MongoDB database is already set up and running with the required collections (people and counters).
- Error handling is minimal and may not cover all edge cases.

## Local Setup and Deployment

To run the API locally, follow these steps:

1. Clone the repository from GitHub.
2. Install Node.js and npm if not already installed.
3. Create a .env file and set the MONGO_URL variable to your MongoDB connection string.
4. Run npm install to install the dependencies.
5. Start the server with npm start.
6. The API will be accessible at http://localhost:3000.

For production deployment, consider hosting the API on a server and configuring environment variables as needed.

For more details, refer to the [README.md](https://github.com/TobyAjLot/HNGx-task-two/blob/master/README.md) file.

Enjoy using the Person API!

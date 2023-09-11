# Person API - Node.js

![Node.js](https://img.shields.io/badge/Node.js-v14%2B-green)
![npm](https://img.shields.io/badge/npm-latest-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)

This Node.js API allows you to manage a collection of persons with basic CRUD (Create, Read, Update, Delete) operations. You can use this API to perform actions on person records such as adding new persons, querying persons by name, updating their information, and deleting them.

## Table of Contents

- [Person API - Node.js](#person-api---nodejs)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Configuration](#configuration)
  - [Running the API](#running-the-api)
  - [API Endpoints](#api-endpoints)
    - [Get All People](#get-all-people)
    - [Get Person by ID](#get-person-by-id)
    - [Create a New Person](#create-a-new-person)
    - [Update a Person](#update-a-person)
    - [Delete a Person](#delete-a-person)
  - [Source Code](#source-code)
  - [UML](#uml)

## Getting Started

### Prerequisites

Before setting up and running the Person API, ensure you have the following prerequisites installed:

- Node.js (v14 or later)
- npm
- MongoDB

### Installation

1. Fork and clone the repository to your local machine:

   ```bash
   git clone <repository-url>
   cd person-api-nodejs
   ```

2. Install the project dependencies:

   ```bash
   npm install
   ```

### Configuration

1. Create a .env file in the project root directory with the following content:

   ```dotenv
   MONGO_URL=your-mongodb-connection-string
   ```

   Replace 'your-mongodb-connection-string' with your MongoDB connection URI.

## Running the API

To start the API server, run the following command:

```bash
npm start
```

The server will start on port 3000 by default

## API Endpoints

### Get All People

- **Endpoint**: `GET /api/people`
- **Description**: Retrieves a list of all people in the database.
- **Response**: 200 OK

### Get Person by ID

- **Endpoint**: `GET /api/:user_id`
- **Description**: Retrieves a specific person by their ID.
- **Response**: 200 OK or 404 Not Found

### Create a New Person

- **Endpoint**: `POST /api`
- **Description**: Creates a new person in the database.
- **Request Body**:

  ```json
  {
    "name": "Harry Potter"
  }
  ```

- **Response**: 201 Created or 400 Bad Request (in case of validation errors)

### Update a Person

- **Endpoint**: `PUT /api/:user_id`
- **Description**: Updates a person's information by their ID.
- **Request Body**:

  ```json
  {
    "name": "Updated Name"
  }
  ```

- **Response**: 200 OK or 404 Not Found

### Delete a Person

- **Endpoint**: `DELETE /api/:name`
- **Description**: Deletes a person by their ID.
- **Response**: 200 OK or 404 Not Found

## Source Code

- https://github.com/TobyAjLot/HNGx-task-two

## UML

![Class Diagram](https://www.planttext.com/api/plantuml/png/hP6z3eCW58LtdkAE4kiBaAPnwDmqwHCWt1eQ0GFeKllk1SLMauwT8ESdvmlKFd0N1jqHqN7luOhEMmDF0b21aWoK2VFTS8qCV73Aj54eeSLmYLf1TwhFwZOU4wDLahm8GJDekA4RbS1vf1GEUS2YdtTPtgV9YOOiCW9TdMGClKoLR1rWwPvvu0niyq2nZqliy1kdvCEH6Wtt6KGPZoxy0hahynSGXzgE6v38iPZ7gQgcKtuMaiz5N1b9ZKQcRte3)

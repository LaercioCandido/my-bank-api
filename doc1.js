export const swaggerDocument =
{
  "swagger": "2.0",
  "info": {
    "description": "This is a sample api about accounts management of the a bank.",
    "version": "1.0.0",
    "title": "My bank API"
  },
  "host": "localhost:3000",
  "tags": [
    {
      "name": "account",
      "description": "Account management"
    }
  ],
  "paths": {
    "/account": {
      "get": {
        "tags": [
          "account"
        ],
        "summary": "Get existing accounts",
        "description": "Get existing accounts description..",
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Successful operation",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/Account"
              }
            }
          },
          "400": {
            "description": "Error ocurred"
          }
        }
      },
      "post": {
        "tags": [
          "account"
        ],
        "summary": "Create a new account",
        "description": "Create a new account with the received parameters.",
        "consumes": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "description": "Account object",
            "required": true,
            "schema": {
              "$ref": "#/definitions/Account"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Account created"
          },
          "400": {
            "description": "Error ocurred"
          }
        }
      },
      "put": {
        "tags": [
          "account"
        ],
        "summary": "Update an existing account",
        "description": "Update an existing account",
        "operationId": "updatePet",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "description": "Account object",
            "required": true,
            "schema": {
              "$ref": "#/definitions/Account"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Account updated"
          },
          "400": {
            "description": "Error ocurred"
          }
        }
      }
    },
    "/account/{accountId}": {
      "get": {
        "tags": [
          "account"
        ],
        "summary": "Find account by ID",
        "description": "Returns a single account",
        "operationId": "getAccountById",
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "accountId",
            "in": "path",
            "description": "ID of account to return",
            "required": true,
            "type": "integer",
            "format": "int64"
          }
        ],
        "responses": {
          "200": {
            "description": "successful operation",
            "schema": {
              "$ref": "#/definitions/Account"
            }
          },
          "400": {
            "description": "Account not found"
          }
        }
      },
      "delete": {
        "tags": [
          "account"
        ],
        "summary": "Deletes a account",
        "description": "",
        "operationId": "deleteAccount",
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "accountId",
            "in": "path",
            "description": "Account id to delete",
            "required": true,
            "type": "integer",
            "format": "int64"
          }
        ],
        "responses": {
          "200": {
            "description": "Account deleted"
          },
          "404": {
            "description": "Account not found"
          }
        }
      },
      "patch": {
        "tags": [
          "account"
        ],
        "summary": "Update the balance of a account",
        "description": "",
        "operationId": "updateBalance",
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "accountId",
            "in": "path",
            "description": "Account Id to patch",
            "required": true,
            "type": "integer",
            "format": "int64"
          }
        ],
        "responses": {
          "200": {
            "description": "successful operation",
            "schema": {
              "$ref": "#/definitions/Account"
            }
          },
          "400": {
            "description": "Account not found"
          }
        }
      }
    }
  },
  "definitions": {
    "Account": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "example": "Mario Vargas"
        },
        "balance": {
          "type": "number",
          "example": 659.50
        }
      }
    }
  }
};

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
          "example": 659.5
        }
      }
    }
  }
}

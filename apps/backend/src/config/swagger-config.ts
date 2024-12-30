import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API - Sauna Reservation & Roles Management",
      version: "1.1.0",
      description: "API documentation for the Express app, including Sauna and Role management",
    },

    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "John" },
            surname: { type: "string", example: "Doe" },
            email: { type: "string", example: "john.doe@example.com" },
            passwordHash: { type: "string", example: "hashedpassword123" },
            salt: { type: "string", example: "randomsalt" },
            role: {
              type: "object",
              properties: { id: { type: "integer" }, name: { type: "string" } },
            },
            reservations: {
              type: "array",
              items: {
                type: "object",
                properties: { id: { type: "integer" } },
              },
            },
          },
        },

        UpdateUserRequest: {
          type: "object",
          properties: {
            id: { type: "number", example: 1 },
            name: { type: "string", example: "John" },
            surname: { type: "string", example: "Doe" },
            email: { type: "string", example: "john.doe@example.com" },
            passwordHash: { type: "string", example: "hashedpassword123" },
            salt: { type: "string", example: "randomsalt" },
            role: { type: "string", example: "admin" },
            reservations: {
              type: "array",
              items: { type: "integer", example: 1 },
            },
          },
        },

        AddUserRequest: {
          type: "object",
          properties: {
            name: { type: "string", example: "John" },
            surname: { type: "string", example: "Doe" },
            email: { type: "string", example: "john.doe@example.com" },
            passwordHash: { type: "string", example: "hashedpassword123" },
            salt: { type: "string", example: "randomsalt" },
            role: { type: "string", example: "admin" },
            reservations: {
              type: "array",
              items: { type: "integer", example: 1 },
            },
          },
        },

        SaunaResponse: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Example2" },
            saunaType: {
              type: "string",
              example: "Infrared",
              enum: ["Infrared", "Finnish", "Steam", "Turkish"],
            },
            humidity: { type: "integer", example: 120 },
            temperature: { type: "integer", example: 6 },
            peopleCapacity: { type: "integer", example: 4 },
            reservations: {
              type: "array",
              items: { type: "integer", example: 1 },
            },
          },
        },
        AddSaunaRequest: {
          type: "object",
          properties: {
            name: { type: "string", example: "Name1" },
            saunaType: { type: "string", example: "Infrared" },
            humidity: { type: "integer", example: 120 },
            temperature: { type: "integer", example: 6 },
            peopleCapacity: { type: "integer", example: 3 },
            reservations: {
              type: "array",
              items: { type: "integer", example: [1, 2, 3, 4] },
            },
          },
        },
        UpdateSaunaRequest: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            saunaType: { type: "string", example: "Infrared" },
            humidity: { type: "integer", example: 120 },
            temperature: { type: "integer", example: 6 },
            peopleCapacity: { type: "integer", example: 3 },
            reservations: {
              type: "array",
              items: { type: "integer", example: [1, 2] },
            },
          },
        },

        Role: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Admin" },
            description: { type: "string", example: "Administrator role" },
            users: {
              type: "array",
              items: { type: "integer", example: [1, 2, 3] },
            },
          },
        },
        AddRoleRequest: {
          type: "object",
          properties: {
            name: { type: "string", example: "Admin" },
            description: { type: "string", example: "Administrator role" },
            users: {
              type: "array",
              items: { type: "integer", example: [1, 2, 3] },
            },
          },
        },
        UpdateRoleRequest: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Admin" },
            description: { type: "string", example: "Updated role description" },
            users: {
              type: "array",
              items: { type: "integer", example: [1, 2, 3] },
            },
          },
        },
      },
    },

    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
    ],
  },

  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;


import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API - Sauna Reservation",
      version: "1.0.9",
      description: "API documentation for my Express app",
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
        AddUpdateUserRequest: {
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
            saunaType: { type: "string", example: "Infrared Sauna" },
            humidity: { type: "integer", example: 120 },
            temperature: { type: "integer", example: 6 },
            peopleCapacity: { type: "integer", example: 4 },
            reservations: [1, 2, 3]
          },
        },
        AddSaunaRequest: {
          type: "object",
          properties: {
            saunaType: { type: "string", example: "Infrared Sauna" },
            humidity: { type: "integer", example: 120},
            temperature: { type: "integer", example: 6 },
            peopleCapacity: { type: "integer", example: 3 },
          },
        },
        UpdateSaunaRequest: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },

            saunaType: { type: "string", example: "Infrared Sauna" },
            humidity: { type: "integer", example: 120},
            temperature: { type: "integer", example: 6 },
            peopleCapacity: { type: "integer", example: 3 },
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


import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API",
      version: "1.0.0",
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
            name: { type: "string", example: "Infrared Sauna" },
            type: { type: "string", example: "infrared" },
            capacity: { type: "integer", example: 6 },
            location: { type: "string", example: "Main spa room" },
          },
        },
        AddSaunaRequest: {
          type: "object",
          properties: {
            name: { type: "string", example: "Infrared Sauna" },
            type: { type: "string", example: "infrared" },
            capacity: { type: "integer", example: 6 },
            location: { type: "string", example: "Main spa room" },
          },
        },
        UpdateSaunaRequest: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Updated Sauna Name" },
            type: { type: "string", example: "steam" },
            capacity: { type: "integer", example: 8 },
            location: { type: "string", example: "New spa area" },
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


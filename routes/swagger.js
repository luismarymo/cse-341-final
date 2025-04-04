const router = require("express").Router();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hotel Management API",
      version: "1.0.0",
      description:
        "API designed to help hotel managers keep track of staff, bookings, rooms, etc.",
    },
    servers: [
      {
        url: "https://hotel-management-api-f3q4.onrender.com",
      },
    ],
    tags: [
      {
        name: "Rooms",
        description: "Operations related to hotel rooms",
      },
      {
        name: "Staff",
        description: "Manage hotel staff",
      },
    ],
    components: {
      schemas: {
        Room: {
          type: "object",
          required: [
            "roomNumber",
            "type",
            "pricePerNight",
            "capacity",
            "availability",
          ],
          properties: {
            roomNumber: {
              type: "integer",
              description: "Room number",
              example: 201,
            },
            type: {
              type: "string",
              description:
                "Type of room (single, double, family room, suite, etc.)",
              example: "Family Room",
            },
            pricePerNight: {
              type: "number",
              format: "float",
              description: "Price per night",
              example: 120,
            },
            capacity: {
              type: "integer",
              description: "Maximum number of guests the room can accommodate",
              example: 4,
            },
            amenities: {
              type: "array",
              description: "List of amenities available in the room",
              items: {
                type: "string",
              },
              example: ["Wi-Fi", "Mini Fridge", "Air Conditioning", "TV"],
            },
            availability: {
              type: "boolean",
              description: "Indicates if the room is currently available",
              example: true,
            },
            description: {
              type: "string",
              description: "A brief description of the room",
              example:
                "A large room with two queen beds, perfect for families.",
            },
          },
        },
        Staff: {
          type: "object",
          required: [
            "firstName",
            "lastName",
            "role",
            "salary",
            "status",
            "hireDate",
          ],
          properties: {
            firstName: {
              type: "string",
              description: "First name of the staff member",
              example: "Alice",
            },
            lastName: {
              type: "string",
              description: "Last name of the staff member",
              example: "Johnson",
            },
            role: {
              type: "string",
              description: "Job position or role in the hotel",
              example: "Receptionist",
            },
            email: {
              type: "string",
              format: "email",
              description: "Email address of the staff member",
              example: "alice.johnson@example.com",
            },
            salary: {
              type: "number",
              format: "float",
              description: "Monthly salary",
              example: 3200.0,
            },
            status: {
              type: "string",
              enum: ["active", "on leave", "retired"],
              description: "Employment status of the staff member",
              example: "active",
            },
            hireDate: {
              type: "string",
              format: "date",
              description: "Date when the staff member was hired",
              example: "2022-06-15",
            },
          },
        },
      },
    },
  },
  apis: [
    "./controllers/bookings.js",
    "./controllers/rooms.js",
    "./controllers/staff.js",
    "./controllers/users.js",
  ],
};

const specs = swaggerJsdoc(options);

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

module.exports = router;

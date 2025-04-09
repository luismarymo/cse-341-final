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
      {
        name: "Bookings",
        description: "See the hotel booking",
      },
      {
        name: "Users",
        description: "See the users/clients from the hotel",
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
        Booking: {
          type: "object",
          required: ["roomNumber", "checkInDate", "checkOutDate", "status"],
          properties: {
            roomNumber: {
              type: "string",
              description: "Room number related to the booking",
              example: "201",
            },
            checkInDate: {
              type: "string",
              format: "date",
              description: "Check-in date for the booking",
              example: "2025-05-01",
            },
            checkOutDate: {
              type: "string",
              format: "date",
              description: "Check-out date for the booking",
              example: "2025-05-07",
            },
            status: {
              type: "string",
              description: "Booking status (e.g., confirmed, cancelled)",
              example: "confirmed",
            },
          },
        },
        User: {
          type: "object",
          required: ["name", "role"],
          properties: {
            name: {
              type: "string",
              description: "Name of the user/client",
              example: "John Doe",
            },
            email: {
              type: "string",
              format: "email",
              description: "Email address of the user",
              example: "john.doe@example.com",
            },
            role: {
              type: "string",
              description: "Role of the user (e.g., client, admin)",
              example: "client",
            },
            oauthId: {
              type: "string",
              description: "OAuth ID for third-party authentication",
              example: "google-oauth2|1234567890",
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

const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

/**
 * @swagger
 * /rooms:
 *   get:
 *     summary: Get all rooms
 *     description: Retrieve a list of all available rooms
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: A JSON array of rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 *       400:
 *         description: Bad request
 */
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().db().collection("rooms").find();
    result.toArray().then((rooms) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(rooms);
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * @swagger
 * /rooms/{id}:
 *   get:
 *     summary: Get a single room by ID
 *     description: Retrieve details of a specific room
 *     tags: [Rooms]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Room details returned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       404:
 *         description: Room not found
 *       500:
 *         description: Invalid ID format or database error
 */
const getSingle = async (req, res) => {
  try {
    const roomId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("rooms")
      .findOne({ _id: roomId });

    if (result) {
      res.setHeader("content-Type", "application/json");
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Room not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /rooms:
 *   post:
 *     summary: Create a new room
 *     description: Add a new room to the database
 *     tags: [Rooms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Room'
 *     responses:
 *       204:
 *         description: Room successfully created
 *       500:
 *         description: Internal server error
 */
const createRoom = async (req, res) => {
  const room = {
    roomNumber: req.body.roomNumber,
    type: req.body.type,
    pricePerNight: req.body.pricePerNight,
    capacity: req.body.capacity,
    amenities: req.body.amenities,
    availability: req.body.availability,
    description: req.body.description,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("rooms")
    .insertOne(room);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error ||
          "Some error occurred while updating the room information",
      );
  }
};

/**
 * @swagger
 * /rooms/{id}:
 *   put:
 *     summary: Update a room by ID
 *     description: Modify an existing room's details
 *     tags: [Rooms]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Room'
 *     responses:
 *       204:
 *         description: Room successfully updated
 *       500:
 *         description: Error updating room
 */
const updateRoom = async (req, res) => {
  const roomId = new ObjectId(req.params.id);
  const room = {
    roomNumber: req.body.roomNumber,
    type: req.body.type,
    pricePerNight: req.body.pricePerNight,
    capacity: req.body.capacity,
    amenities: req.body.amenities,
    availability: req.body.availability,
    description: req.body.description,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("rooms")
    .replaceOne({ _id: roomId }, room);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error ||
          "Some error occurred while updating the room information",
      );
  }
};

/**
 * @swagger
 * /rooms/{id}:
 *   delete:
 *     summary: Delete a room by ID
 *     description: Remove a room from the database
 *     tags: [Rooms]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Room successfully deleted
 *       500:
 *         description: Error deleting room
 */
const deleteRoom = async (req, res) => {
  const roomId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("rooms")
    .deleteOne({ _id: roomId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error ||
          "Some error occurred while deleting the room information.",
      );
  }
};

module.exports = {
  getAll,
  getSingle,
  createRoom,
  updateRoom,
  deleteRoom,
};

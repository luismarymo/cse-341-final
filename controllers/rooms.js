const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

/**
 * @swagger
 * /rooms:
 *   get:
 *     summary: Get all rooms
 *     description: Retrieve a list of all rooms
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
 *       400:
 *         description: Invalid Room Id
 *       404:
 *         description: Room not found
 *       500:
 *         description: Internal server error
 */
const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid Room id to find a Room");
  }
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
 * /rooms/available:
 *   get:
 *     summary: Get all available rooms rooms
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
 *       404:
 *         description: No available rooms
 */
const getAllAvailable = async (req, res) => {
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("rooms")
      .find({ availability: true });
    result.toArray().then((rooms) => {
      if (rooms.length === 0) {
        return res.status(404).json({ message: "No available rooms found." });
      }

      res.setHeader("Content-Type", "application/json");
      res.status(200).json(rooms);
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
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
 *       412:
 *         description: Precondition Failed
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
 *       400:
 *         description: Invalid Room Id
 *       412:
 *         description: Precondition Failed
 *       500:
 *         description: Error updating room
 */
const updateRoom = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid Room id to update a Room");
  }
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
 *       400:
 *         description: Invalid Room Id
 *       500:
 *         description: Error deleting room
 */
const deleteRoom = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid Room id to delete a Room");
  }
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
  getAllAvailable,
  createRoom,
  updateRoom,
  deleteRoom,
};

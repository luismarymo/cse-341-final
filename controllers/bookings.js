const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

/**
 * @swagger
 * /bookings:
 *   get:
 *     summary: Get all bookings
 *     description: Retrieve a list of all the bookings
 *     tags: [Bookings]
 *     responses:
 *       200:
 *         description: A JSON array of bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Bad request
 */
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().db().collection("bookings").find();
    result.toArray().then((bookings) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(bookings);
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * @swagger
 * /bookings/{id}:
 *   get:
 *     summary: Get a single booking by ID
 *     description: Retrieve details of a specific booking
 *     tags: [Bookings]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking details returned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Invalid Booking Id
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Internal server error
 */
const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json("Must use a valid Booking id to find a Booking");
  }
  try {
    const bookingId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection("bookings").findOne({ _id: bookingId });

    if (result) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Booking not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create a new booking
 *     description: Add a new booking to the database
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       204:
 *         description: Booking successfully created
 *       500:
 *         description: Internal server error
 */
const createBooking = async (req, res) => {
  try {
    const booking = {
      roomNumber: req.body.roomNumber,
      checkInDate: req.body.checkInDate,
      checkOutDate: req.body.checkOutDate,
      status: req.body.status,
    };

    const response = await mongodb.getDatabase().db().collection("bookings").insertOne(booking);

    if (response.acknowledged) {
      res.status(204).send();
    } else {
      res.status(500).json({ message: "Some error occurred while creating the booking." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /bookings/{id}:
 *   put:
 *     summary: Update a booking by ID
 *     description: Modify an existing booking's details
 *     tags: [Bookings]
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
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       204:
 *         description: Booking successfully updated
 *       400:
 *         description: Invalid Booking Id
 *       500:
 *         description: Internal server error
 */
const updateBooking = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json("Must use a valid Booking id to update Booking");
  }
  try {
    const bookingId = new ObjectId(req.params.id);
    const booking = {
      roomNumber: req.body.roomNumber,
      checkInDate: req.body.checkInDate,
      checkOutDate: req.body.checkOutDate,
      status: req.body.status,
    };

    const response = await mongodb.getDatabase().db().collection("bookings").replaceOne({ _id: bookingId }, booking);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ message: "Some error occurred while updating the booking." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /bookings/{id}:
 *   delete:
 *     summary: Delete a booking by ID
 *     description: Remove a booking from the database
 *     tags: [Bookings]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Booking successfully deleted
 *       400:
 *         description: Invalid Booking Id
 *       500:
 *         description: Internal server error
 */
const deleteBooking = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json("Must use a valid Booking id to delete Booking");
  }
  try {
    const bookingId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection("bookings").deleteOne({ _id: bookingId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ message: "Some error occurred while deleting the booking." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createBooking,
  updateBooking,
  deleteBooking,
};

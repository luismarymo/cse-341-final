const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("bookings")
      .find();
    result.toArray().then((bookings) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(bookings);
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid Booking id to find a Booking");
  }
  try {
    const bookingId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("bookings")
      .findOne({ _id: bookingId });

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

const createBooking = async (req, res) => {
  try {
    const booking = {};
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("bookings")
      .insertOne(booking);

    if (response.acknowledged) {
      res.status(204).send();
    } else {
      res.status(500).json({
        message: "Some error occurred while creating the booking.",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBooking = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid Booking id to update Booking");
  }
  try {
    const bookingId = new ObjectId(req.params.id);
    const booking = {};
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("bookings")
      .replaceOne({ _id: bookingId }, booking);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          response.error ||
            "Some error ocurred while updating the booking information",
        );
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBooking = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid Booking id to delete Booking");
  }
  try {
    const bookingId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("bookings")
      .deleteOne({ _id: bookingId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          response.error ||
            "Some error ocurred while deleting the booking information.",
        );
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

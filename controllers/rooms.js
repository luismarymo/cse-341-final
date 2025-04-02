const mongodb = require("../data/database");
// const ObjectId = require("mongodb").ObjectId;

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

module.exports = {
  getAll,
};

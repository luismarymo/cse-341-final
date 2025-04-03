const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

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

const getSingle = async (req, res) => {
  try {
    const roomId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('rooms').findOne({ _id: roomId });

    if (result) {
      res.setHeader('content-Type', 'application/json');
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Room not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Invalid ID format or database error' });
  }
};

const createRoom = async (req, res) => {
  const room = {
    roomNumber: req.body.roomNumber,
    type: req.body.type,
    pricePerNight: req.body.pricePerNight,
    capacity: req.body.capacity,
    amenities: req.body.amenities,
    availability: req.body.availability,
    description: req.body.description
  };
  const response = await mongodb.getDatabase().db().collection("rooms").insertOne(room);
  if(response.acknowledged){
    res.status(204).send();
  } else{
    res.status(500).json(response.error || 'Some error ocurred while updating the room information');
  }

};

const updateRoom = async (req, res) => {
const roomId = new ObjectId(req.params.id);
const room = {
  roomNumber: req.body.roomNumber,
  type: req.body.type,
  pricePerNight: req.body.pricePerNight,
  capacity: req.body.capacity,
  amenities: req.body.amenities,
  availability: req.body.availability,
  description: req.body.description
  };
const response = await mongodb.getDatabase().db().collection("rooms").replaceOne({_id:roomId},room);
if(response.modifiedCount > 0){
  res.status(204).send();
} else{
  res.status(500).json(response.error || 'Some error ocurred while updating the room information');
}

};

const deleteRoom = async (req, res) => {
  const roomId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db().collection("rooms").deleteOne({_id:roomId});
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else{
    res.status(500).json(response.error || 'Some error ocurred while deleting the room information.');
  }
  
};
module.exports = {
  getAll,
  getSingle,
  createRoom,
  updateRoom,
  deleteRoom
};

const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().db().collection("staff").find();
    result.toArray().then((staff) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(staff);
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const staffId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('staff').findOne({ _id: staffId });

    if (result) {
      res.setHeader('content-Type', 'application/json');
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: ' not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Invalid ID format or database error' });
  }
};

const createStaff = async (req, res) => {
  const staff = {
    
  };
  const response = await mongodb.getDatabase().db().collection("staff").insertOne(staff);
  if(response.acknowledged){
    res.status(204).send();
  } else{
    res.status(500).json(response.error || 'Some error ocurred while updating the staff information');
  }

};

const updateStaff = async (req, res) => {
const staffId = new ObjectId(req.params.id);
const staff = {
    };
const response = await mongodb.getDatabase().db().collection("bookings").replaceOne({_id:staffId},staff);
if(response.modifiedCount > 0){
  res.status(204).send();
} else{
  res.status(500).json(response.error || 'Some error ocurred while updating the staff information');
}

};

const deleteStaff = async (req, res) => {
  const staffId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db().collection("staff").deleteOne({_id:staffId});
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else{
    res.status(500).json(response.error || 'Some error ocurred while deleting the staff information.');
  }
  
};
module.exports = {
  getAll,
  getSingle,
  createStaff,
  updateStaff,
  deleteStaff
};
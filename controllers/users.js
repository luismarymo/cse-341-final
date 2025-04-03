const mongodb = require("../data/database");
const { ObjectId } = require('mongodb');


const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().db().collection("users").find();
    result.toArray().then((users) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(users);
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getSingle = async (req, res) => {
    try {
      const userId = new ObjectId(req.params.id);
      const result = await mongodb.getDatabase().db().collection("users").findOne({ _id: userId });
  
      if (result) {
        res.setHeader('content-Type', 'application/json');
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Invalid ID format or database error' });
    }
  };

  const createUser = async (req, res) => {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthday: req.body.birthday,
    email: req.body.email
  };
  const response = await mongodb.getDatabase().db().collection("users").insertOne(user);
  if(response.acknowledged){
    res.status(204).send();
  } else{
    res.status(500).json(response.error || 'Some error ocurred while updating the user information');
  }

};

const updateUser = async (req, res) => {
const userId = new ObjectId(req.params.id);
const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthday: req.body.birthday,
    email: req.body.email
  };
const response = await mongodb.getDatabase().db().collection("users").replaceOne({_id:userId},user);
if(response.modifiedCount > 0){
  res.status(204).send();
} else{
  res.status(500).json(response.error || 'Some error ocurred while updating the user information');
}

};

const deleteUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db().collection("users").deleteOne({_id:userId});
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else{
    res.status(500).json(response.error || 'Some error ocurred while deleting the user information.');
  }
  
};
module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser
};

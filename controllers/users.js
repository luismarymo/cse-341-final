const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A JSON array of hotel users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
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

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a single user by ID
 *     description: Retrieve details of a specific user
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details returned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid User Id
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json("Must use a valid User id to find a User");
  }
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("users")
      .findOne({ _id: userId });

    if (result) {
      res.setHeader("content-Type", "application/json");
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Add a new user to the database
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       204:
 *         description: User successfully created
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
const createUser = async (req, res) => {
  try {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthday: req.body.birthday,
      email: req.body.email,
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("users")
      .insertOne(user);
    if (response.acknowledged) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(response.error || "Some error occurred while creating the user");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     description: Modify an existing user's details
 *     tags: [Users]
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
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       204:
 *         description: User successfully updated
 *       400:
 *         description: Invalid User Id
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
const updateUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json("Must use a valid User id to update a User");
  }
  try {
    const userId = new ObjectId(req.params.id);
    const user = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      oauthId: req.body.oauthId,
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("users")
      .replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(response.error || "Some error occurred while updating the user");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Remove a user from the database
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User successfully deleted
 *       400:
 *         description: Invalid User Id
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
const deleteUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json("Must use a valid User id to delete a User");
  }
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("users")
      .deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(response.error || "Some error occurred while deleting the user");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser,
};

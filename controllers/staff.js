const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

/**
 * @swagger
 * /staff:
 *   get:
 *     summary: Get all staff members
 *     description: Retrieve a list of all staff members
 *     tags: [Staff]
 *     responses:
 *       200:
 *         description: A JSON array of staff members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Staff'
 *       400:
 *         description: Bad request
 */
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

/**
 * @swagger
 * /staff/{id}:
 *   get:
 *     summary: Get a single staff member by ID
 *     description: Retrieve details of a specific staff member
 *     tags: [Staff]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Staff member details returned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Staff'
 *       400:
 *         description: Invalid Staff Id
 *       404:
 *         description: Staff member not found
 *       500:
 *         description: Internal server error
 */
const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid Staff id to find Staff");
  }
  try {
    const staffId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("staff")
      .findOne({ _id: staffId });

    if (result) {
      res.setHeader("content-Type", "application/json");
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Staff member not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /staff:
 *   post:
 *     summary: Create a new staff member
 *     description: Add a new staff member to the database
 *     tags: [Staff]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Staff'
 *     responses:
 *       204:
 *         description: Staff member successfully created
 *       412:
 *         description: Precondition Failed
 *       500:
 *         description: Internal server error
 */
const createStaff = async (req, res) => {
  try {
    const staff = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      role: req.body.role,
      email: req.body.email,
      salary: req.body.salary,
      status: req.body.status,
      hireDate: req.body.hireDate,
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("staff")
      .insertOne(staff);
    if (response.acknowledged) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          response.error ||
            "Some error occurred while updating the staff information",
        );
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /staff/{id}:
 *   put:
 *     summary: Update a staff member by ID
 *     description: Modify an existing staff member's details
 *     tags: [Staff]
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
 *             $ref: '#/components/schemas/Staff'
 *     responses:
 *       204:
 *         description: Staff member successfully updated
 *       400:
 *         description: Invalid Staff Id
 *       412:
 *         description: Precondition Failed
 *       500:
 *         description: Internal server error
 */
const updateStaff = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid Staff id to update Staff");
  }
  try {
    const staffId = new ObjectId(req.params.id);
    const staff = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      role: req.body.role,
      email: req.body.email,
      salary: req.body.salary,
      status: req.body.status,
      hireDate: req.body.hireDate,
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("staff")
      .replaceOne({ _id: staffId }, staff);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          response.error ||
            "Some error occurred while updating the staff information",
        );
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /staff/{id}:
 *   delete:
 *     summary: Delete a staff member by ID
 *     description: Remove a staff member from the database
 *     tags: [Staff]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Staff member successfully deleted
 *       400:
 *         description: Invalid Staff Id
 *       500:
 *         description: Internal server error
 */
const deleteStaff = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid Staff id to delete Staff");
  }
  try {
    const staffId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("staff")
      .deleteOne({ _id: staffId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          response.error ||
            "Some error occurred while deleting the staff information.",
        );
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createStaff,
  updateStaff,
  deleteStaff,
};

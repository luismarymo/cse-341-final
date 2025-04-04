const validator = require("../helpers/validate");

const saveRoom = (req, res, next) => {
  const validationRule = {
    roomNumber: "required|numeric",
    type: "required|string",
    pricePerNight: "required|numeric",
    capacity: "required|numeric",
    amenities: "array",
    availability: "required|boolean",
    description: "string",
  };
  validator(req.body, validationRule, {}, (error, status) => {
    if (!status) {
      res.status(412).send({
        sucess: false,
        message: "validation failed",
        data: error,
      });
    } else {
      next();
    }
  });
};

const saveStaff = (req, res, next) => {
  const validationRule = {
    firstName: "required|string",
    lastName: "required|string",
    role: "required|string",
    email: "email",
    salary: "required|numeric",
    status: "required|string",
    hireDate: "required|date",
  };
  validator(req.body, validationRule, {}, (error, status) => {
    if (!status) {
      res.status(412).send({
        sucess: false,
        message: "validation failed",
        data: error,
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveRoom,
  saveStaff,
};

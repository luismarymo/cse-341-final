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

const saveUser = (req, res, next) => {
  const validationRule = {
    name: "required|string",
    email: "email",
    role: "required|string",
    oauthId: "string"
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

const saveBooking = (req, res, next) => {
  const validationRule = {
    roomNumber: "required|string",
    checkInDate: "required|string",
    checkOutDate: "required|string",
    status: "required|string"
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
  saveUser,
  saveBooking
};

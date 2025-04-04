const router = require("express").Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
  res.send("Welcome to the Hotel Management API");
});

router.use("/rooms", require("./rooms"));
router.use("/users", require("./users"));
router.use("/bookings", require("./bookings"));
router.use("/staff", require("./staff"));

module.exports = router;

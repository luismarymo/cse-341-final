const router = require("express").Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
  const message =
    "Welcome to the Hotel Management API | " +
    (req.session.user !== undefined
      ? `Logged in as ${req.session.user.displayName}`
      : "Logged Out");
  res.send(message);
});

router.use("/github", require("./github"));
router.use("/rooms", require("./rooms"));
router.use("/users", require("./users"));
router.use("/bookings", require("./bookings"));
router.use("/staff", require("./staff"));

module.exports = router;

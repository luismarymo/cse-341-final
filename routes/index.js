const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Welcome to the Hotel Management API");
});

router.use("/rooms", require("./rooms"));

module.exports = router;

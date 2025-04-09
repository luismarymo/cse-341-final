const router = require("express").Router();

const bookingsController = require("../controllers/bookings");
const { isAuthenticated } = require("../middleware/authenticate");
const validation = require("../middleware/validate");

router.get("/", bookingsController.getAll);
router.get("/:id", bookingsController.getSingle);
router.post("/", validation.saveBooking, bookingsController.createBooking);
router.put(
  "/:id",
  isAuthenticated,
  validation.saveBooking,
  bookingsController.updateBooking,
);
router.delete("/:id", isAuthenticated, bookingsController.deleteBooking);

module.exports = router;

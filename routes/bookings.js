const router = require("express").Router();

const bookingsController = require("../controllers/bookings");
const validation = require("../middleware/validate");

router.get("/", bookingsController.getAll);
router.get("/:id", bookingsController.getSingle);
router.post("/", validation.saveBooking, bookingsController.createBooking);
router.put("/:id", validation.saveBooking, bookingsController.updateBooking);
router.delete("/:id", bookingsController.deleteBooking);

module.exports = router;

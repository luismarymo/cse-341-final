const router = require("express").Router();

const staffController = require("../controllers/staff");
const { isAuthenticated } = require("../middleware/authenticate");
const validation = require("../middleware/validate");

router.get("/", isAuthenticated, staffController.getAll);
router.get("/:id", isAuthenticated, staffController.getSingle);
router.post(
  "/",
  isAuthenticated,
  validation.saveStaff,
  staffController.createStaff,
);
router.put(
  "/:id",
  isAuthenticated,
  validation.saveStaff,
  staffController.updateStaff,
);
router.delete("/:id", isAuthenticated, staffController.deleteStaff);

module.exports = router;

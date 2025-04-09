const router = require("express").Router();

const roomsController = require("../controllers/rooms");
const { isAuthenticated } = require("../middleware/authenticate");
const validation = require("../middleware/validate");

router.get("/", roomsController.getAll);
router.get("/available", roomsController.getAllAvailable);
router.get("/:id", roomsController.getSingle);
router.post(
  "/",
  isAuthenticated,
  validation.saveRoom,
  roomsController.createRoom,
);
router.put(
  "/:id",
  isAuthenticated,
  validation.saveRoom,
  roomsController.updateRoom,
);
router.delete("/:id", isAuthenticated, roomsController.deleteRoom);

module.exports = router;

const router = require("express").Router();

const roomsController = require("../controllers/rooms");
const validation = require("../middleware/validate");

router.get("/", async (req, res) => {
    try {
        await roomsController.getAll(req, res);
    } catch (error) {
        console.error("Error fetching rooms:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/available", async (req, res) => {
    try {
        await roomsController.getAllAvailable(req, res);
    } catch (error) {
        console.error("Error fetching available rooms:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        await roomsController.getSingle(req, res);
    } catch (error) {
        console.error("Error fetching room:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/", validation.saveRoom, async (req, res) => {
    try {
        await roomsController.createRoom(req, res);
    } catch (error) {
        console.error("Error creating room:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.put("/:id", validation.saveRoom, async (req, res) => {
    try {
        await roomsController.updateRoom(req, res);
    } catch (error) {
        console.error("Error updating room:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await roomsController.deleteRoom(req, res);
    } catch (error) {
        console.error("Error deleting room:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;

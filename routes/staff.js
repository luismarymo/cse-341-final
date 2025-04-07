const router = require("express").Router();

const staffController = require("../controllers/staff");
const validation = require("../middleware/validate");

router.get("/", async (req, res) => {
    try {
        await staffController.getAll(req, res);
    } catch (error) {
        console.error("Error fetching staff members:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        await staffController.getSingle(req, res);
    } catch (error) {
        console.error("Error fetching staff member:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/", validation.saveStaff, async (req, res) => {
    try {
        await staffController.createStaff(req, res);
    } catch (error) {
        console.error("Error creating staff member:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.put("/:id", validation.saveStaff, async (req, res) => {
    try {
        await staffController.updateStaff(req, res);
    } catch (error) {
        console.error("Error updating staff member:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await staffController.deleteStaff(req, res);
    } catch (error) {
        console.error("Error deleting staff member:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;

const express = require("express");
const attendanceController = require("../controllers/attendanceController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router.post("/create", attendanceController.createAttendance);
router.get("/", attendanceController.getAllAttendances)

router
  .route("/:id")
  .get(attendanceController.getAttendance)
  .patch(attendanceController.updateAttendance)
  .delete(attendanceController.deleteAttendance);

module.exports = router;

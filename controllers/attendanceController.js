const Attendance = require("../models/attendanceModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");

exports.createAttendance = catchAsync(async (req, res, next) => {
  const { user } = req.body;

  if (!user) return next(new AppError("Please provide a user.", 400));

  let today = new Date();
  today = today.setUTCHours(0, 0, 0, 0);

  const existingAttendance = await Attendance.findOne({
    user,
    attendanceDate: today
  });

  if (existingAttendance) {
    return next(new AppError("Duplicate entry", 400));
  }

  req.body.attendanceDate = new Date();
  const newAttendance = await Attendance.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      attendance: newAttendance,
    },
  });
});

exports.getAllAttendancesUser = catchAsync(async (req, res, next) => {
  const userId = req.params.user;
  if(!userId) return next(new AppError("Please provide user id.", 400));

  const docs = await Attendance.find({
    user: userId
  });

  if(!docs) return next(new AppError("No attendances of the current user", 404));

  res.status(200).json({
    status: "success",
    data: {
      attendances: docs
    }
  })
})

exports.getAttendance = factory.getOne(Attendance);
exports.getAllAttendances = factory.getAll(Attendance);
exports.updateAttendance = factory.updateOne(Attendance);
exports.deleteAttendance = factory.deleteOne(Attendance);

const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  attendanceType: {
    type: String,
    required: [true, "Please provide attendance type"],
    enum: {
      values: ["present", "absent", "leave"],
      message: "Attendance type is either: present, absent, or leave",
    },
  },
  attendanceDate: {
    type: Date,
    required: [true, "Please provide a date"],
    default: () => {
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
      return today;
    },
  },
  attendanceTime: {
    type: String,
    default: () => {
      const now = new Date();
      return now.toTimeString().split(' ')[0]; 
    },
  },
  reason: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide the user"],
  },
});

attendanceSchema.pre('save', function (next) {
  const date = new Date(this.attendanceDate);
  date.setUTCHours(0, 0, 0, 0);
  this.attendanceDate = date;
  next();
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;

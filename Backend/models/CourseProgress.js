import mongoose from "mongoose";

const CourseProgressSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  completedCount: {
    type: Number,
    default: 0,
  },
  totalCount: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("CourseProgress", CourseProgressSchema);

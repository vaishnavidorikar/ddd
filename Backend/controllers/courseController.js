import Course from '../models/Course.js';

// Get all courses for a user
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({ userId: req.params.userId });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add new course
export const addCourse = async (req, res) => {
  const { title, description, userId } = req.body;
  try {
    const newCourse = new Course({ title, description, userId });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update course progress
export const updateProgress = async (req, res) => {
  const { progressPercent, completed } = req.body;
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { progressPercent, completed },
      { new: true }
    );
    res.json(updatedCourse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

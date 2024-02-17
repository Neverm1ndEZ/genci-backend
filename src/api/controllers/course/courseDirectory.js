// routes/courseDirectory.js
import { Course } from "../../../models/index.js";
import { errorHelper } from "../../../utils/index.js";

export default async (req, res) => {
  // Extract the slug parameter from the request
  const { slug } = req.params;

  // Check if the slug is not provided or is empty
  if (!slug || slug.trim() === "") {
    return res.status(400).json(errorHelper("Invalid slug", req, "Slug is required."));
  }

  try {
    // Find the course based on the provided slug
    const course = await Course.findOne({ slug });

    if (!course) {
      return res.status(404).json(errorHelper("Course not found", req));
    }

    // Respond with the category and course name
    res.status(200).json({
      category: course.category,
      courseName: course.name,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json(errorHelper("Server error", req, err.message));
  }
};

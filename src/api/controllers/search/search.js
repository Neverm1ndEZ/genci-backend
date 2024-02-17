import { errorHelper, getText } from "../../../utils/index.js";
import { validateSearch } from "../../validators/search.validator.js";

import { Course, techNews, update } from "../../../models/index.js";

export default async (req, res) => {
  const {
    error,
    value: { q },
  } = validateSearch(req.query);

  if (error) {
    return res
      .status(400)
      .json(errorHelper("00100", req, error.details[0].message));
  }
  const courseResults = await Course.find({
    $or: [
      { name: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } },
    ],
  });

  const techNewsResults = await techNews.find({
    title: { $regex: q, $options: "i" },
  });

  const updatesResults = await update.find({
    title: { $regex: q, $options: "i" },
  });

  const results = [
    ...courseResults.map((result) => ({
      source: "Course",
      data: {
        name: result.name,
        description: result.description,
        slug: result.slug,
      },
    })),
    ...techNewsResults.map((result) => ({
      source: "Tech News",
      data: { title: result.title, slug: result.slug },
    })),
    ...updatesResults.map((result) => ({
      source: "Updates",
      data: { title: result.title, slug: result.slug },
    })),
  ];

  if (!results.length) {
    return res
      .status(401)
      .json(errorHelper("00101", req, "search result not found"));
  }

  res.status(200).json({
    Message: getText("00102"),
    Code: "00102",
    results,
  });

};

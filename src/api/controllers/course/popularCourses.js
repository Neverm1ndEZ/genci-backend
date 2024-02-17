import { Course} from "../../../models/index.js";
import { getText } from "../../../utils/index.js";

export default async (req, res) => {


    try {

      const courses = await Course.find({}).catch((err) => {
        return res.status(500).json(errorHelper("00008", req, err.message));
      });
    
      if (!courses.length) {
        return res
          .status(401)
          .json(errorHelper("00097", req, "Courses not present"));
      }
      let popularCourses = await Course.aggregate([{
        "$sort": { "view": -1 }
      },
      {
        "$limit": 10
      },])
     
    return res.status(200).json({
      Message: getText("00295"),
      Code: "00295",
      popularCourses
    });
    }
    catch (err) {
      return res.status(500).json(errorHelper("000031", req, err.message))
    }

};
import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import config from "../config";
import axios from "axios";

export default function Courses({history})  {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    axios
   //searching the API
    .get(config.apiBaseUrl+"/courses")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((errors) => {
        console.log(errors);
        history.push("/error");
      });
  },[]);

  //Return list of courses from API
    return (
      <div>
        <div className="wrap main--grid">
          {courses.map((course) => (
            <Link
              className="course--module course--link"
              key={course.id}
              to={`/courses/${course.id}`}
            >
              <h2 className="course--label"> Course </h2>
              <h3 className="course--title">{course.title} </h3>
            </Link>
          ))}

          <Link
            className="course--module course--add--module"
            to="/courses/create"
          >
            <h3 className="course--add--title">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 13 13"
                className="add"
              >
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>
              Create Course
            </h3>
          </Link>
        </div>
      </div>
    );
  }


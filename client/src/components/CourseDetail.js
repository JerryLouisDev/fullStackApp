import React, { Component, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import config from "../config";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import Errors from "./Errors";

//exporting CourseDetail function
export default function CourseDetail({ context, history }) {
  //This stores the errors and courses
  const [errors, setErrors] = useState([]);
  const [course, setCourse] = useState({});

  //Getting the id from the UI
  let { id } = useParams();

  //Using Axios to get course data and user data
  useEffect(() => {
    //fetching from API and geting the post state
    axios
      .get(config.apiBaseUrl + `/courses/${id}`)
      .then((response) => {
        setCourse(response.data);
      })
      .catch((errors) => {
        console.log("Course ID not found", errors);
        history.push("/notfound");
      });
  }, []);

  //if user is authenticated they can delete a course
  const deleteCourse = () => {
    const authUser = context.authenticatedUser;
    context.data
      .deleteCourse(id, authUser.emailAddress, authUser.password)
      .then((errors) => {
        if (errors.length) {
          setErrors(errors);
        } else {
          console.log("Yuurrr, the course is deleted.");
          history.push("/");
          window.location.reload(true); // returns user to Main Course page
        }
      })
      .catch((error) => {
        console.log(error);
        history.push("/error"); // sends user to Error page
      });
  };
  //Setting authenticated User to a variable
  const authUser = context.authenticatedUser;
  return (
    <React.Fragment>
      {errors.length > 0 ? (
        <Errors errors={errors} />
      ) : (
        <>
          <div className="actions--bar">
            <div className="wrap">
              {authUser ? (
                //checking if the user course user is defined
                authUser.id === course?.User?.id ? (
                  <React.Fragment>
                    <Link
                      className="button"
                      to={`/courses/${course.id}/update`}
                    >
                      {" "}
                      Update Course{" "}
                    </Link>
                    <Link
                      className="button"
                      to="/"
                      onClick={() => deleteCourse()}
                    >
                      {" "}
                      Delete Course{" "}
                    </Link>
                    <Link className="button button-secondary" to="/">
                      {" "}
                      Return to List{" "}
                    </Link>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Link className="button" to="/">
                      {" "}
                      Return to List{" "}
                    </Link>
                  </React.Fragment>
                )
              ) : (
                <React.Fragment>
                  <Link className="button" to="/">
                    {" "}
                    Return to List{" "}
                  </Link>
                </React.Fragment>
              )}
            </div>
          </div>
          <div className="wrap">
            <h1> Course Detail </h1>
            <form>
              <div className="main--flex">
                <div>
                  <h4 className="course--detail--title">Course</h4>
                  <h3 className="course--name">{course.title}</h3>
                  <span>
                    {" "}
                    By {course?.User?.firstName} {course?.User?.lastName}{" "}
                  </span>
                  <ReactMarkdown children={course.description} />
                </div>
                <div>
                  <h3 className="course--detail--title"> Estimated Time </h3>
                  {course.estimatedTime === null ||
                  course.estimatedTime === "" ? (
                    <p> " " </p>
                  ) : (
                    <p> {course.estimatedTime} </p>
                  )}
                  <h3 className="course--detail--title"> Materials Needed </h3>
                  {course.materialsNeeded === null ||
                  course.materialsNeeded === "" ? (
                    <p> " " </p>
                  ) : (
                    <ReactMarkdown children={course.materialsNeeded} />
                  )}
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </React.Fragment>
  );
}
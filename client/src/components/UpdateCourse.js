import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Form from "./Form";

//using a class component to export class
export default function UpdateCourse({ context, history }) {
  const [errors, setErrors] = useState([]);
  // const [course, setCourse] = useState({});
  const [title, setTitle] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  const [description, setDescription] = useState("");

  const {
    id: userId,
    emailAddress,
    firstName,
    lastName,
    password,
  } = context.authenticatedUser;

  let { id } = useParams();

  useEffect(() => {
    context.data
      .getCourse(id)
      .then((courseData) => {
        setTitle(courseData.title);
        setDescription(courseData.description);
        setEstimatedTime(courseData.estimatedTime);
        setMaterialsNeeded(courseData.materialsNeeded);

        // if (userId !== user.id) {
        //   history.push("/forbidden");
        // }
      })
      .catch((error) => {
        console.log(error);
        if (error.message === "Course Not Found.") {
          history.push("/notfound");
        } else {
          history.push("/error");
          console.log(`Error: unable to retrieve course.`);
        }
      });

    if (userId === null) {
      history.push("/signin");
    }
  }, []);

  //submitting new changes
 const submit = () => {
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
    };

    context.data
      .updateCourse(id, course, emailAddress, password)
      .then((errors) => {
        // console.log(id);
        if (errors.length) {
         setErrors(errors);
        } else {
          history.push(`/courses/${id}`);
          console.log("Yurrrr, the course has been updated!");
        }
      })
      .catch((error) => {
        console.error(error);
        history.push("/error");
      });
  };
  // if user changes mind they can cancel and old information will stay
  const cancel = () => {
    history.push(`/courses/${id}`);
  };

  return (
    <div className="wrap">
      <h2>Update Course</h2>
      <Form
        cancel={cancel}
        errors={errors}
        submit={submit}
        submitButtonText="Update Course"
        elements={() => (
          <React.Fragment>
            <div className="main--flex">
              <div>
                <label>
                  {" "}
                  Course Title
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                  />
                </label>
                <p>
                  {" "}
                  By {firstName} {lastName}{" "}
                </p>
                <label>
                  {" "}
                  Description
                  <textarea
                    id="description"
                    name="description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                  />
                </label>
              </div>
              <div>
                <label>
                  {" "}
                  Estimated Time
                  <input
                    id="estimatedTime"
                    name="estimatedTime"
                    type="text"
                    value={estimatedTime}
                    onChange={(e) => setEstimatedTime(e.target.value)}
                    placeholder="Estimated Time"
                  />
                </label>
                <label>
                  {" "}
                  Materials Needed
                  <textarea
                    id="materialsNeeded"
                    name="materialsNeeded"
                    type="text"
                    value={materialsNeeded}
                    onChange={(e) => setMaterialsNeeded(e.target.value)}
                    placeholder="Materials Needed"
                  />
                </label>
              </div>
            </div>
          </React.Fragment>
        )}
      />
    </div>
  );
}

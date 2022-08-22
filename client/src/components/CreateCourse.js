import React, { useState, useEffect } from "react";
import Form from "./Form";
// import Errors from "./Errors";
//Exporting reacts useState to use react compoents in this function
export default function CreateCourse({ context, location, history }) {
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  const [description, setDescription] = useState("");
// object destructuring authenticatedUser
  const {
    id: userId,
    emailAddress,
    firstName,
    lastName,
    password,
  } = context.authenticatedUser;

  // when an authenticated user decides to submit
  const submit = () => {
    const { from } = location.state || { from: { pathname: "/" } };
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
    };

    context.data
      .createCourse(course, emailAddress, password)
      .then((errors) => {
        console.log(errors);
        if (errors.length) {
          setErrors(errors);
        } else {
          history.push(from);
          console.log(`Yurrrr! The course is created!`);
        }
      })
      .catch((error) => {
        console.error(error);
        history.push("/error");
      });
  };

  //returns to list of courses when cancelled
  const cancel = () => {
    history.push("/");
  };

  return (
    <main>
      <div className="wrap">
        <h2>Create Course</h2>
        <Form
          cancel={cancel}
          errors={errors}
          submit={submit}
          submitButtonText="Create Course"
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
    </main>
  );
}

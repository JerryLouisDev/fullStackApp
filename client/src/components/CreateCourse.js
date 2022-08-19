import React, { useState } from "react";
import Form from "./Form";

export default function CreateCourse() {
  let history = useHistory();
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const context = useContext(Context);
  const authUser = context.authenticatedUser;

  const ctrlSubmit = () => {
    const email = authUser.emailAddress;
    const password = authUser.userPassword;
    const authIDUser = authUser.id;

    const theCourse = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
    };
    context.data
      .createCourse(course, email, password)
      .then((errors) => {
        if (errors.length) {
          setErrors(errors);
        } else {
          history.push("/");
        }
      })
      .catch((error) => {
        console.error(error);
        history.push("/error");
      });
  };
  const onChange = (e) => {
    const val = e.target.value;
    const name = e.target.name;

    updateCourseState({
      ...course,
      [name]: val,
    });

    if (name === "courseTitle") {
      name = "title";
    } else if (name === "courseDescription") {
      name = "description";
    }
  };
  return (
    <main>
      <div className="wrap">
        <h2>Create Course</h2>
        <Form
          cancel={this.cancel}
          errors={this.errors}
          submit={this.submit}
          submitButtonText="Create Course"
          elements={() => (
            <>
              <div className="main--flex">
                <div>
                  <label>
                    {""}
                    Course Title
                    <input
                      id="title"
                      name="title"
                      type="text"
                      value={title}
                      onChange={this.change}
                      placeholder="Title"
                    />
                  </label>
                  <p>
                    {" "}
                    By
                    {authUser.firstName} {authUser.lastName}
                  </p>

                  <label>
                    Course Description
                    <textarea
                      id="description"
                      name="description"
                      type="text"
                      value={description}
                      onChange={this.change}
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
                      onChange={this.change}
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
                      onChange={this.change}
                      placeholder="Materials Needed"
                    />
                </label>
                </div>
              </div>
            </>
          )}
        />
      </div>
    </main>
  );
}

import React, { Component } from "react";
import { Link } from "react-router-dom";
import config from "../config";

export default class Courses extends Component {
  state = {
    courses: [],
  };

  componentDidMount() {
    fetch(config.apiBaseUrl + "/courses")
      .then((res) => res.json())
      .then((response) => {
        this.setState({
          courses: response.data,
        });
      })
      .catch((error) => {
        console.log("Looks like we have an error: ", error);
        this.props.history.push("/error");
      });
  }

  render() {
    const state = this.state;
    return (
      <main>
        <div className="wrap main--grid">
          {state.courses.map((course) => (
            <link
              key={course.id}
              to={`/courses/${course.id}`}
              className="course--module course--link"
            >
              <h2 className="course--label"> Course </h2>
              <h3 className="course--title">{course.title} </h3>
            </link>
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
                <polygon 
                points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6"
                >
                </polygon>
              </svg>
              Create New Course
            </h3>
          </Link>
        </div>
      </main>
    );
  }
}

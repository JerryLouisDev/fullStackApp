import React, { Component } from "react";
import { Link } from "react-router-dom";
import config from "../config";
import ReactMarkdown from "react-markdown";

export default class CourseDetail extends Component {
  state = {
    course: {},
    user: {},
  };
  componentDidMount() {
    fetch(config.apiBaseUrl + `/courses/${this.props.match.params.id}`)
      .then((res) => res.json())
      .then((response) => {
        this.setState({
          courses: response.data,
          user: response.data.User,
        });
      })
      .catch((error) => {
        console.log("Looks like we have an error: ", error);
        this.props.history.push("/notfound");
      });
  }
  render() {
    const context = this.props.context;
    const authUser = context.authenticatedUser;
    const { course, user } = this.state;

    return (
      <>
        <main>
          <div className="actions--bar">
            <div className="wrap">
              {authUser ? (
                authUser.id === user.id ? (
                  <>
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
                      onClick={() => this.deleteCourse()}
                    >
                      {" "}
                      Delete Course{" "}
                    </Link>
                    <Link className="button button-secondary" to="/">
                      {" "}
                      Return to the List{" "}
                    </Link>
                  </>
                ) : (
                  <>
                    <Link className="button" to="/">
                      {" "}
                      Return to List{" "}
                    </Link>
                  </>
                )
              ) : (
                <>
                  <Link> Return to List </Link>
                </>
              )}
            </div>
          </div>
        </main>
      </>
    );
  }
}

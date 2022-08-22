import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Form from "./Form";

export default function UserSignIn({ location, context, history }) {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const submit = () => {
    const { from } = location.state || { from: { pathname: "/" } };

    context.actions
      .signIn(emailAddress, password)
      .then((user) => {
        if (user === null) {
          setErrors(["Sign-in was unsuccessful."]);
          //If user exists, sign in is successful and the user is redirected to the Course List page
        } else {
          history.push(from);
          console.log(`Sign-in was successful ${emailAddress}!`);
        }
      })
      .catch((error) => {
        console.error("We have an error:", error);
        history.push("/error");
      });
  };

  const cancel = () => {
    history.push("/");
  };

  return (
    <div className="form--centered">
      <h2>Sign In</h2>
      <Form
        cancel={cancel}
        errors={errors}
        submit={submit}
        submitButtonText="Sign In"
        elements={() => (
          <React.Fragment>
            <label>
              {" "}
              Email Address
              <input
                id="emailAddress"
                name="emailAddress"
                type="text"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                placeholder="Email"
              />
            </label>
            <label>
              {" "}
              Password
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </label>
          </React.Fragment>
        )}
      />
      <p>
        Don't have a user account? Click here to{" "}
        <Link to="/signup">sign up!</Link>
      </p>
    </div>
  );
}

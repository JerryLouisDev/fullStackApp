import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Form from "./Form";

export default function UserSignUp({ context, history }) {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword ,setConfirmPassword] = useState("");

  const submit = () => {
    // this will create the user when no errors
    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
    };

    if(password !== confirmPassword){
      setErrors([ "password & confirm password should be matched" ]);
      return;
    }

    context.data
      .createUser(user)
      .then((errors) => {
        if (errors.length) {
          setErrors(errors);
          console.log(errors);
        } else {
          context.actions
            .signIn(emailAddress, password)
            .then(() => {
              console.log(`${emailAddress} created as a new user!`);
              history.push("/");
            })
            .catch((error) => {
              console.log("We have an error: ", error);
              history.push("/error");
            });
        }
      })
      .catch((err) => {
        console.log(err);
        history.push("/error");
      });
  };
  //Return to list of courses when cancel button is clicked
  const cancel = () => {
    history.push("/");
  };
  return (
    <div className="form--centered">
      <div className="grid-33 centered signin">
        <h2>Sign Up</h2>
        <Form
          cancel={cancel}
          errors={errors}
          submit={submit}
          submitButtonText="Sign Up"
          elements={() => (
            <React.Fragment>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
              />
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
              />
              <input
                id="emailAddress"
                name="emailAddress"
                type="text"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                placeholder="Email Address"
              />
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
              />
            </React.Fragment>
          )}
        />
        <p>
          Already have a user account? <Link to="/signin">Click here</Link> to
          sign in!
        </p>
      </div>
    </div>
  );
}

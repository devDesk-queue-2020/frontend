import React from "react";
import axios from "axios";
import * as Yup from "yup";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";

export default function regForm() {
  function submitHandler(values, actions) {
    console.log(values, actions);
    // Sending our form data to a server
    axios
      .post("localhost:5000/api/users", values)
      .then(res => {
        console.log(res);
        actions.resetForm();
      })
      .catch(e => console.log(e))
      .finally(() => {
        console.log("Axios request finished.");
      });
  }

  return (
    <div className="regForm">
      <Formik
        onSubmit={submitHandler}
        initialValues={initialTestingFormValues}
        validationSchema={validationSchema}
      >
        <Form>
          <label htmlFor="firstname">First Name</label>
          <Field
            type="text"
            id="loginform_firstname"
            name="firstname"
            placeholder="Enter your first name here"
          />
          <ErrorMessage name="firstname" component="div" className="error" />
          <label htmlFor="loginform_lastname">Last Name</label>
          <Field
            type="text"
            id="loginform_lastname"
            name="lastname"
            placeholder="Enter your last name here"
          />
          <ErrorMessage name="lastname" component="div" className="error" />
          <label htmlFor="loginform_username">Username</label>
          <Field
            type="text"
            id="loginform_username"
            name="username"
            placeholder="Enter your username here"
          />
          <ErrorMessage name="username" component="div" className="error" />
          <label htmlFor="loginform_password">Password</label>
          <Field
            type="password"
            id="loginform_password"
            name="password"
            placeholder="Enter your password here"
          />
          <ErrorMessage name="password" component="div" className="error" />
          <label htmlFor="loginform_role">Select your role: </label>
          <Field as="select" name="role_type" id="loginform_role_type">
            <option value="">Select an option</option>
            <option value="helper">Helper</option>
            <option value="student">Student</option>
          </Field>
          <ErrorMessage name="role_type" component="div" className="error" />
          <Link to={"/StudentDashboard"}>
          <button type="submit">Sign Up</button>
          </Link>
        </Form>
      </Formik>
    </div>
  );
}

const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("Please enter your first name"),
    lastname: Yup.string().required("Please enter your last name"),
  username: Yup.string().required("Please enter a username"),
  password: Yup.string().required("Please enter a password"),
  role_type: Yup.string().required("Please select your role")
});

// Clearing the values in our form inputs
const initialTestingFormValues = {
  firstname: ``,
  lastname: ``,
  username: "",
  password: "",
  role_type: ""
};

import React from "react";
import axios from "axios";
import * as Yup from "yup";
import { Form, Formik, Field, ErrorMessage } from "formik";
import styled from "styled-components";
import { useHistory } from "react-router-dom";


const FormDiv = styled.div`
  margin-top: 10%;
`;

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 15rem;
  margin: 0 auto;
  background: #efeff3;
  padding: 2rem 2rem;
  border-radius: 5px;
  box-shadow: #999 1px 2px 5px;

  a {
    color: #08addd;
    text-decoration: none;
  }

  input {
    display: flex;
    flex-direction: column;
    font-size: 1rem;
    margin-bottom: 1rem;
    border: 1px solid gray;
    border-radius: 3px;
    height: 30px;
    padding-left: 12px;
    outline: none;

    &::placeholder {
      color: gray;
    }
  }

  button {
    display: flex;
    margin-top: 1rem;
    padding: 0.5rem 0.5rem;
    background: #bb1333;
    color: #fff;
    font-size: 1rem;
    cursor: pointer;
    outline: none;
    border: none;
    border-radius: 3px;

    &:hover {
      color: #bb1333;
      background: #fff;
    }
  }
`;

export default function SignUp() {
  const history = useHistory()
  function submitHandler(values, actions) {
    console.log(values, actions);
    // Sending form data to server
    axios
      .post("http://devdesk-2020.heroku.app.com/api/users/register", values)
      .then(res => {
        if (res.role === "student") {
          history.push("/student/dashboard");
        } else {
          history.push("/helper/dashboard");
        }
        console.log("response", res);
        actions.resetForm();
      })
      .catch(e => console.log(e))
      .finally(() => {
        console.log("Axios request finished.");
      });
  }

  return (
    <FormDiv>
      <Formik
        onSubmit={submitHandler}
        initialValues={initialTestingFormValues}
        validationSchema={validationSchema}
      >
        <StyledForm>
          <Form>
            <label htmlFor="first_name">First Name</label>
            <Field type="text" id="loginform_first_name" name="first_name" />
            <ErrorMessage name="first_name" component="div" className="error" />
            <label htmlFor="loginform_last_name">Last Name</label>
            <Field type="text" id="loginform_last_name" name="last_name" />
            <ErrorMessage name="last_name" component="div" className="error" />
            <label htmlFor="loginform_username">Username</label>
            <Field type="text" id="loginform_username" name="username" />
            <ErrorMessage name="username" component="div" className="error" />
            <label htmlFor="loginform_email">Email</label>
            <Field type="text" id="loginform_email" name="email" />
            <ErrorMessage name="email" component="div" className="error" />
            <label htmlFor="loginform_password">Password</label>
            <Field type="password" id="loginform_password" name="password" />
            <ErrorMessage name="password" component="div" className="error" />
            <label htmlFor="loginform_role">Select Role: </label>
            <Field as="select" name="role" id="loginform_role">
              <option value="">Select an option</option>
              <option value="helper">Helper</option>
              <option value="student">Student</option>
            </Field>
            <ErrorMessage name="role" component="div" className="error" />
            <button type="submit">Sign Up</button>
          </Form>
        </StyledForm>
      </Formik>
    </FormDiv>
  );
}

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("First Name is a required field"),
  last_name: Yup.string().required("Last Name is a required field"),
  username: Yup.string().required("Username is a required field"),
  password: Yup.string().required("Password is a required field"),
  role: Yup.string().required("Must select role")
});

// Clearing the values in our form inputs
const initialTestingFormValues = {
  first_name: ``,
  last_name: ``,
  username: "",
  password: "",
  role: ""
};

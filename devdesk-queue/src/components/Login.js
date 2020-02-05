import React from "react";
import axios from "axios";
import * as Yup from "yup";
import { Form, Formik, Field, ErrorMessage } from "formik";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import jwt from "jsonwebtoken";


const FormDiv = styled.div`
  margin-top: 10%;
`;

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
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

export default function Login() {
  const history = useHistory()
  function submitHandler(values, actions) {
    console.log(values, actions);
    // Sending form data to server
    
    axios
      .post("http://localhost:5001/api/users/login", values)
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          const decoded = jwt.decode(res.data.token)
          localStorage.setItem("userId", decoded.user_id)
          console.log(decoded)
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
            <label htmlFor="loginform_username">Username</label>
            <Field type="text" id="loginform_username" name="username" />
            <ErrorMessage name="username" component="div" className="error" />
            <label htmlFor="loginform_password">Password</label>
            <Field type="password" id="loginform_password" name="password" />
            <ErrorMessage name="password" component="div" className="error" />
            <label htmlFor="loginform_remember_pass">Remember password?</label>
            <Field
              type="checkbox"
              id="loginform_remember_pass"
              name="remember_pass"
            />
            <ErrorMessage
              name="remember_pass"
              component="div"
              className="error"
            />
            <button type="submit">Login</button>
          </Form>
        </StyledForm>
      </Formik>
    </FormDiv>
  );
}

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is a required field"),
  password: Yup.string().required("Password is a required field"),
  remember_pass: Yup.boolean(),});

// Clearing the values in our form inputs
const initialTestingFormValues = {
  username: "",
  password: "",
  remember_pass: false,
};

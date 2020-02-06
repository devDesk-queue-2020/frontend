import React from "react";
import axios from "axios";
import * as Yup from "yup";
import { Form, Formik, Field, ErrorMessage } from "formik";
import styled from "styled-components";
import jwt from "jsonwebtoken";
import { Link } from "react-router-dom";


const FormDiv = styled.div`
  margin-top: 5%;
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

const MainHeader = styled.header`
display: flex;
align-items: center;
justify-content: space-between;
background-color: RGB(188,19,50);
`;

const Img = styled.img`
width: 5rem;
height: 5rem;
`;

const Title = styled.header`
display: flex;
flex-wrap: wrap;
align-items: center;
color: white;
`;

const Nav = styled.div`
display: flex;
justify-content: space-around;
width: 10rem;
`;


export default function Login(props) {
  function submitHandler(values, actions) {
    console.log(values, actions);
    // Sending form data to server

    axios
      .post("https://devdesk-2020.herokuapp.com/api/users/login", values)
      .then(res => {
        actions.resetForm();
        props.setToken(res.data.token);
        const decoded = jwt.decode(res.data.token);
        localStorage.setItem("userId", decoded.user_id);

        localStorage.setItem("token", res.data.token);
        console.log(decoded);
        if (decoded.role === "Helper") {
          console.log("helper");
          props.history.push("/helper/dashboard");
        } else {
          console.log("student");
          props.history.push("/student/dashboard");
        }
      })
      .catch(e => console.log(e.message))
      .finally(() => {
        console.log("Axios request finished.");
      });
  }

  return (
<>
            <MainHeader>
      <Title>
      <Img
            className="main-img"
            src={require(`./Lambda_Logo.jpg`)}
            alt="logo"
          />
      <h1>Lambda DevDesk</h1>
      </Title>
      <Nav>
      <Link className="nav-links" to={"/signup"}>
            Sign Up
          </Link>
          <Link className="nav-links" to={"/login"}>
          Login
          </Link>
          </Nav>
    </MainHeader>

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
          <p>Don't have an account? <Link className="nav-links" to={"/signup"}>
          Sign up!
          </Link></p>
        </StyledForm>
      </Formik>
    </FormDiv>
    </>
  );
}

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is a required field"),
  password: Yup.string().required("Password is a required field"),
  remember_pass: Yup.boolean()
});

// Clearing the values in our form inputs
const initialTestingFormValues = {
  username: "",
  password: "",
  remember_pass: false
};

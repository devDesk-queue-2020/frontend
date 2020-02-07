import React from "react";
import axios from "axios";
import * as Yup from "yup";
import { Form, Formik, Field, ErrorMessage } from "formik";
import styled from "styled-components";
import { Link } from "react-router-dom";
import jwt from "jsonwebtoken";



const FormDiv = styled.div`
  margin-top: 5%;
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
text-decoration: none;
color: white;
`;

const Nav = styled.div`
display: flex;
justify-content: space-around;
width: 5rem;
`;

export default function SignUp(props) {
  function submitHandler(values, actions) {
    // Sending form data to server
    axios
      .post("https://devdesk-queue-20.herokuapp.com/api/users/register", values)
      .then(res => {
        const newUser = {"username": res.data.userData.username, "password": values.password}
        axios
        .post("https://devdesk-queue-20.herokuapp.com/api/users/login", newUser)
        .then(res => {
          props.setToken(res.data.token);
          const decoded = jwt.decode(res.data.token);
          localStorage.setItem("userId", decoded.user_id);
          if (decoded.role === "Helper") {
    
            props.history.push("/login");
          } else {
         
            props.history.push("/login");
          }
        })
        .catch(e => console.log(e.message))
        .finally(() => {
          console.log("Axios request finished.");
        });
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
            <label htmlFor="first_name">First Name</label>
            <Field type="text" id="first_name" name="first_name" />
            <ErrorMessage name="first_name" component="div" className="error" />
            <label htmlFor="last_name">Last Name</label>
            <Field type="text" id="last_name" name="last_name" />
            <ErrorMessage name="last_name" component="div" className="error" />
            <label htmlFor="username">Username</label>
            <Field type="text" id="username" name="username" />
            <ErrorMessage name="username" component="div" className="error" />
            <label htmlFor="email">Email</label>
            <Field type="text" id="email" name="email" />
            <ErrorMessage name="email" component="div" className="error" />
            <label htmlFor="password">Password</label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage name="password" component="div" className="error" />
            <label htmlFor="role">Select Role: </label>
            <Field as="select" name="role" id="role">
              <option value="">Select an option</option>
              <option value="Helper">Helper</option>
              <option value="Student">Student</option>
            </Field>
            <ErrorMessage name="role" component="div" className="error" />
            <button type="submit">Sign Up</button>
          </Form>
        </StyledForm>
      </Formik>
    </FormDiv>
    </>
  );
}

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("First Name is a required field"),
  last_name: Yup.string().required("Last Name is a required field"),
  username: Yup.string().required("Username is a required field"),
  email: Yup.string().required("Email is a required field"),
  password: Yup.string().required("Password is a required field"),
  role: Yup.string().required("Must select role")
});

// Clearing the values in our form inputs
const initialTestingFormValues = {
  first_name: ``,
  last_name: ``,
  username: "",
  email: "",
  password: "",
  role: ""
};

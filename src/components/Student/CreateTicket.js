import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Form, Formik, Field, ErrorMessage } from "formik";
import styled from "styled-components";
// import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const MainHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: RGB(188, 19, 50);
`;

const Img = styled.img`
  width: 5rem;
  height: 5rem;
`;

const Title = styled.header`
  display: flex;
  flex-wrap: wrap;

  color: white;
`;

const Nav = styled.div`
  display: flex;
  justify-content: space-around;
  width: 15rem;
`;

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
export default function CreateTicket(props) {
  const [category, setCategory] = useState([]);

  // const history = useHistory();
  useEffect(() => {
    axios.get("https://devdesk-queue-20.herokuapp.com/api/category", {
      headers: {
        token: localStorage.getItem("token")
      }
    })
    .then(res => {
        setCategory(res.data);
      })
      .catch(e => console.log(e.message))
      .finally(() => {
        console.log("axios request finished.");
      });
  }, []);

  function submitHandler(values, actions) {

    values["status"] = "Open";
    values["student_id"] = Number(localStorage.getItem("userId"));
 
    // Sending form data to server
    axios({
      method: 'post',
      url: 'https://devdesk-queue-20.herokuapp.com/api/tickets',
      headers: {
      token: localStorage.getItem("token")
      },
       data: {...values}
      })
      .then(res => {
        if (res.status === 201) {
          props.history.push("/student/dashboard");
        }
        actions.resetForm();
      })
      .catch(e => console.log(values))
      .finally(() => {
        console.log("axios request finished");
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
          <Link className="nav-links" to={"/student/dashboard"}>
            Dashboard
          </Link>
          <Link className="nav-links" to={"/login"}>
            Sign Out
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
              <label htmlFor="createticket_category">Category: </label>
              <Field as="select" name="category_id" id="createticket_category">
                <option value="">Select an option</option>
                {category.map(cat => {
                  return <option key={cat.id} value={cat.id}>{cat.category_name}</option>;
                })}
              </Field>
              <ErrorMessage
                name="category_id"
                component="div"
                className="error"
              />
              <label htmlFor="createticket_title">Title</label>
              <Field type="text" id="createticket_title" name="title" />
              <ErrorMessage name="title" component="div" className="error" />
              <label htmlFor="createticket_content">Content</label>
              <Field type="text" id="createticket_content" name="content" />
              <ErrorMessage name="content" component="div" className="error" />
              <button type="submit">Create Ticket</button>
            </Form>
          </StyledForm>
        </Formik>
      </FormDiv>
    </>
  );
}
const validationSchema = Yup.object().shape({
  category_id: Yup.number().required("Please select a category"),
  title: Yup.string().required("Please give a title"),
  content: Yup.string().required("Please describe your problem")
});

const initialTestingFormValues = {
  category_id: "",
  title: "",
  content: ""
};

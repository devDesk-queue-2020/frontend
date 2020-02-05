import React from "react";
import axios from 'axios';
import * as Yup from 'yup';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import styled from "styled-components";



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

export default function CreateTicket() {
    const history = useHistory()
    function submitHandler (values, actions) {
        console.log(values, actions);
        // Sending form data to server
        axios
            .post("http://localhost:5001/api/tickets", values)
            .then(res => {
            console.log(res);
            if (res.status === 201) {
                history.push("/student/dashboard");
            }
            console.log("response", res);
            actions.resetForm();
            })
            .catch(e => console.log(e))
            .finally(() => {
                console.log('Axios request finished.');
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
            <label htmlFor="createticket_category">Category: </label>
            <Field as="select" name="category" id="createticket_category">
                <option value="">Select an option</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="js">JS</option>
                <option value="react">React.js</option>
                <option value="redux">Redux</option>
                <option value="node">Node.js</option>
                <option value="python">Python</option>
                <ErrorMessage name="category" component="div" className="error" />
              </Field>
              <label htmlFor="username">Username</label>
              <Field type="text" id="createticket_username" name="username" />
              <ErrorMessage name="username" component="div" className="error" />
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
    );
    }
    const validationSchema = Yup.object().shape({
        category: Yup.string().required("Please select a category"),
        username: Yup.string(),
        title: Yup.string().required("Please give a title"),
        content: Yup.string().required("Please describe your problem"),
      });

      const initialTestingFormValues = {
        category: "",
        title: "",
        content: "",
      };
      
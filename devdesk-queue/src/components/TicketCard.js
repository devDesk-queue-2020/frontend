import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

export default function TicketCard(props) {
  const Container = styled.div`
    display: flex;
  `;

  const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 20rem;
    margin: 10px 10px 10px 10px;
    border-radius: 5px;
    box-shadow: #999 1px 2px 5px;
  `;

  const CardHeader = styled.div`
    color: white;
    background-color: rgb(47, 43, 73);

    h2 {
      text-align: center;
    }
  `;

  const Button = styled.button`
    margin-top: 1rem;
    padding: 0.5rem 0.5rem;
    background: red;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 8px;
    color: white;
    text-decoration: none;
    &:hover {
      color: red;
      background: white;
    }
  `;

  const CardBody = styled.div`
    padding: 0.5rem 2rem;
  `;

  const CategoryDiv = styled.div``;

  const StatusDiv = styled.div``;

  // Create input area for comment and submit button
  // const id = localStorage.getItem("user_id")
  // onSubmit - values = { input = content, author_id: id, ticket_id: props.ticket.id }
  //          - axios to POST https://devdesk-2020.herokuapp.com/api/comments, {values}
  //        .then(res => { console.log(res)})<=    {
  // "comment_id": 4,
  // "content": "This is a new comment",
  // "author_id": "emma",
  // "ticket_id": 1,
  // "created_by": "2020-02-04 14:57:52"
  //} 

  const [comment, setComment] = useState("");
  console.log(props)

  function submitHandler(e) {
    e.preventDefault();

    const respond= {}
    respond["content"] = comment
    respond["author_id"] = localStorage.getItem("userId");
    respond["ticket_id"] = props.ticket.id
    console.log(respond);
    axios
      .post("https://devdesk-2020.herokuapp.com/api/comments", respond, {headers :{
        Authorization: props.token
      }}) 
      .then(res => {
        console.log(res)
        if (res.status === 201) {
          props.history.push("/helper/dashboard");
        }
      })
      .catch(e => console.log(e.message))
  }
  return (
    <Container>
      <CardContainer>
        <CardHeader>
          <h2>{props.ticket.id}</h2>
        </CardHeader>
        <CardBody>
          <div className="title">
            <h2>{props.ticket.title}</h2>
          </div>

          <div className="ticket-content">
            <h3>Description:</h3>
            <p>{props.ticket.content}</p>
          </div>
          <div>
            <p>Created at: {props.ticket.created_by}</p>
          </div>
          <CategoryDiv>
            <h3>Category:</h3>
            <p>{props.ticket.category_id}</p>
          </CategoryDiv>
          <StatusDiv>
            <h3>Status: {props.ticket.resolved ? "Closed" : "Open"}</h3>
          </StatusDiv>

          <label htmlFor="input_content">Respond to ticket:</label>
          <form onSubmit={submitHandler}>
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              type="textarea"
              // name="input_content"
              // id="input_content"
            />
            <Button type="submit">Respond</Button>
          </form>
        </CardBody>
      </CardContainer>
    </Container>
  );
}

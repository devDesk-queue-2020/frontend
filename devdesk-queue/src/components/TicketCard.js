import React from "react";
import styled from "styled-components";

export default function TicketCard(props) {
  const Container = styled.div`
    margin: o auto;
  `;

  return (
    <Container>

<h2>Student ID: #{props.ticket.student_id}</h2>
          <h2>Category: {props.ticket.category_id}</h2>
          <h2>Status: {props.ticket.resolved ? "Closed" : "Open"}</h2>

        <div className="title">
          <h2>{props.ticket.title}</h2>
        </div>

      <div className="ticket-content">
        <p>{props.ticket.content}</p>
      </div>


    </Container>
  );
}
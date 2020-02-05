import React from "react";
import styled from "styled-components";

export default function TicketCard(props) {
  const Container = styled.div`
    display: flex;

  `;

  const TicketCard = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 20rem;
    margin: 1rem 1rem 1rem 1rem;
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

  const CardBody = styled.div`
    padding: 0.5rem 2rem;
  `;

  const CategoryDiv = styled.div``;

  const StatusDiv = styled.div``;

  return (
    <Container>
      <TicketCard>
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
        </CardBody>
      </TicketCard>
    </Container>
  );
}

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TicketCard from "../TicketCard";
import styled from "styled-components";

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
  align-items: center;

  color: white;
`;

const Nav = styled.div`
  display: flex;
  justify-content: space-around;
  width: 15rem;
`;

export default function StudentDashboard(props) {
  // Adding useState to track data from useEffect
  const [tickets, setTickets] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Adding API Request here
    axios
      .get("https://devdesk-queue-20.herokuapp.com/api/tickets", {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(response => {
        setTickets(response.data);
      })
      .catch(e => console.log(e.message))
      .finally(() => {
        console.log("Axios request finished.");
      });
    axios
      .get("https://devdesk-queue-20.herokuapp.com/api/comments", {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(response => {
        setComments(response.data);
      })
      .catch(e => console.log(e.message))
      .finally(() => {
        console.log("Axios request finished.");
      });
  }, []);

  return (
    <section>
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
          <Link className="nav-links" to={"/student/createticket"}>
            Create Ticket
          </Link>
          <Link
            onClick={() => localStorage.clear()}
            className="nav-links"
            to={"/login"}
          >
            Sign Out
          </Link>
        </Nav>
      </MainHeader>
      <h2>Student Dashboard</h2>
      <div className="dashboard">
        {!tickets ? (
          <p>no tickets</p>
        ) : (
          tickets.map(tick => {
            return (
              <TicketCard
                key={tick.id}
                ticket={tick}
                comment={comments}
                type="student"
                {...props}
              />
            );
          })
        )}
      </div>
    </section>
  );
}

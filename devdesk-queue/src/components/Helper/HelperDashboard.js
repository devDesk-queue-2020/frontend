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
  width: 5rem;
`;

export default function HelperDashboard(props) {
  // Adding useState to track data from useEffect
  const [tickets, setTickets] = useState([]);
  console.log(tickets);

  useEffect(() => {
    // Adding API Request here
    axios
      .get("https://devdesk-2020.herokuapp.com/api/tickets", {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      .then(response => {
        console.log(response.data);
        setTickets(response.data);
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
          <Link className="nav-links" to={"/login"}>
            Sign Out
          </Link>
        </Nav>
      </MainHeader>
      <h2>Helper Dashboard</h2>
      <div className="dashboard">
        {!tickets ? (
          <p>no tickets</p>
        ) : (
          tickets.map(tick => {
            return (
              <TicketCard
                key={tick.id}
                ticket={tick}
                type="helper"
                {...props}
              />
            );
          })
        )}
      </div>
    </section>
  );
}

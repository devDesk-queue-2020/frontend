import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TicketCard from "../TicketCard";

export default function StudentDashboard(props) {
  // Adding useState to track data from useEffect
  const [tickets, setTickets] = useState([]);
  console.log(tickets);

  useEffect(() => {
    // Adding API Request here
    axios.get("http://devdesk-2020.heroku.app.com/api/tickets", { headers: { Authorization: props.token,  }})
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
      <h2>Student Dashboard</h2>
      <div className="student-dashboard">
        <div>
          <Link className="nav-links" to={"/"}>
            Home
          </Link>
        </div>
        {!tickets ? (
          <p>no tickets</p>
        ) : (
          tickets.map(tick => {
            return <TicketCard key={tick.id} ticket={tick} />;
          })
        )}
      </div>
    </section>
  );
}

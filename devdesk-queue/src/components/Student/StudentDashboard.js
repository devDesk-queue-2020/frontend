import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import TicketCard from "../TicketCard";

export default function StudentDashboard() {
  // Adding useState to track data from useEffect
  const [tickets, setTickets] = useState([]);
  console.log(tickets);

  useEffect(() => {
    // Adding API Request here
    Axios.get("http://localhost:5001/api/tickets")
      .then(response => {
        console.log(response.data);
        setTickets(response.data);
      })
      .catch(e => console.log(e))
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

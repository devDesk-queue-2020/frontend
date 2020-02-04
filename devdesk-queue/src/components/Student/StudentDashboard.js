import React, {useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import TicketCard from "../TicketCard";

export default function StudentDashboard() {
    // Adding useState to track data from useEffect
    const [tickets, setTickets] = useState([]);
    
    useEffect(() => {
// Adding API Request here
Axios.get("http://localhost:5000/api/tickets")
      .then(response => {
        console.log(response.data.results);
        setTickets(response.data.results);
      })
      .catch(e => console.log(e))
      .finally(() => {
        console.log("Axios request finished.");
      });
  }, []);

  return (
    <section className="student-dashboard">
    <div>
      <h2>Student Dashboard</h2>
      <Link className="nav-links" to={"/"}>
        Home
      </Link>
    </div>
    {tickets.map(tick => {
      return <TicketCard key={tick.id} ticket={tick} />;
    })}
  </section>
);
}
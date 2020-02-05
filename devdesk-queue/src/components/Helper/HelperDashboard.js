import React, {useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import TicketCard from "../TicketCard";

export default function HelperDashboard() {
    // Adding useState to track data from useEffect
    const [tickets, setTickets] = useState([]);
    
    useEffect(() => {
// Adding API Request here
Axios.get("http://devdesk-2020.heroku.app.com/api/tickets")
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
    <section className="helper-dashboard">
    <div>
      <h2>Helper Dashboard</h2>
      <Link className="nav-links" to={"/"}>
        Home
      </Link>
    </div>
    {!tickets ? <p>no tickets</p> : 
    
    tickets.map(tick => {
      return <TicketCard key={tick.id} ticket={tick} />;
    })}
  </section>
);
}
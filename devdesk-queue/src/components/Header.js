import React from "react";
import { Link } from "react-router-dom";


export default function Header() {
  return (
    <header className="main-header">
      <h1>DevDesk Queue</h1>
      <Link className="nav-links" to={"/signup"}>
            Sign Up
          </Link>
          <Link className="nav-links" to={"/login"}>
            Login
          </Link>
    </header>
  );
}

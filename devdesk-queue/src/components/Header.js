import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const MainHeader = styled.header`
display: flex;
align-items: center;
justify-content: space-between;
background-color: RGB(188,19,50);
`;

const Img = styled.img`
width: 5rem;
height: 5rem;
`;

const Title = styled.header`
display: flex;
flex-wrap: wrap;

color: white;
`;

const Nav = styled.div`
display: flex;
justify-content: space-around;
width: 10rem;
`;

export default function Header() {
  return (
    <MainHeader>
      <Title>
      <Img
            className="main-img"
            src={require(`../img/Lambda_Logo.jpg`)}
            alt="logo"
          />
      <h1>Lambda DevDesk</h1>
      </Title>
      <Nav>
      <Link className="nav-links" to={"/signup"}>
            Sign Up
          </Link>
          <Link className="nav-links" to={"/login"}>
            Login
          </Link>
          </Nav>
    </MainHeader>
  );
}

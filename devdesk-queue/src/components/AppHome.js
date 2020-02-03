import React from "react";
import styled from "styled-components";

const Img = styled.img`
width: 1%;
height: 1%;
`;

export default function AppHome() {
    return (
      <div className="AppHome-Page">
        <div>
          <Img
            className="main-img"
            src={require(`../img/Lambda_Logo.jpg`)}
            alt="logo"
          />
        </div>
      </div>
    );
  }
  
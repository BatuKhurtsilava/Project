import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.header`
  background-color: #333;
  color: white;
  padding: 10px;

  & nav ul {
    display: flex;
    flex-direction: row;
    list-style: none;
    padding: 0;
  }

  & nav ul li {
    margin-right: 20px;
  }
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 18px;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <nav>
        <ul>
          <li>
            <StyledLink to="/">Main</StyledLink>
          </li>
          <li>
            <StyledLink to="/history">History</StyledLink>
          </li>
        </ul>
      </nav>
    </HeaderContainer>
  );
};

export default Header;

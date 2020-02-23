import React from 'react'
import styled from 'styled-components'

import Clock from './clock'

import Months from './months'
import Days from './days'

const StyledHeader = styled.header `
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;

  div {
    h1 {
      margin-bottom: 0.5rem;
    }
    text-align: right;
  }
` 

const Header = () => {
  const date = new Date();

  return (
    <StyledHeader>
      <Clock/>
      <div>
        <h1>{Days[date.getDay()]}</h1>
        <p>{date.getDate()} {Months[date.getMonth()]}, {date.getFullYear()}</p>
      </div>
    </StyledHeader>
  );
}

export default Header;
import React from 'react'
import styled from 'styled-components'

const StyledCheckmark = styled.label `
  display: block;
  position: relative;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  height: 22px;
  width: 22px;
  border: 1px solid;
  border-radius: 50%;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  span {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #eee;

    &::after {
      content: "";
      position: absolute;
      display: none;
      left: 9px;
      top: -3px;
      width: 5px;
      height: 16px;
      border: solid;
      border-width: 0 1px 1px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  }

  &:hover span {
    background-color: #ccc;
  }

  input:checked ~ span {
    background-color: #2196f3;
  }

  input:checked ~ span::after {
    display: block;
  }
` 

const Checkmark = (props) => {
  return (
    <StyledCheckmark>
      <input 
      type='checkbox' 
      checked={props.checked}
      onChange={props.markCompleted} 
      />
      <span/>
    </StyledCheckmark>  
  );
}

export default Checkmark;
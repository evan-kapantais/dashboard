import React from 'react'
import styled from 'styled-components'

import Checkmark from './checkmark'

const StyledItem = styled.li `
  margin: 1.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    max-width: calc(100% - 22px - 2rem);

    button {
      margin-right: 1rem;
      cursor: pointer;
      background: transparent;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        margin: 0;
        width: 16px;
      }
    }

    p {
      font-size: 1.2rem;
      position: relative;
      border-bottom: 1px solid transparent;
      transition: border-bottom 300ms ease;

      &:hover {
        /* outline: auto; */
        /* border-bottom: 1px solid lightskyblue; */
      }
    }
  }
`

 const TodoItem = (props) => {
  return (
    <StyledItem>
      <div>
        <button onClick={() => props.deleteItem(props.todo)}>
          <img src={require('../../images/bin-white.png')} alt=""/>
        </button>
        <p 
        contentEditable
        onBlur={() => props.onBlur(props.todo)}
        >
          {props.todo.name}
        </p>
      </div>
        <Checkmark
        checked={props.todo.completed}
        markCompleted={() => props.markCompleted(props.todo)}
        />
    </StyledItem>
  );
}

export default TodoItem;
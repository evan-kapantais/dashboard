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
      /* font-weight: 600; */
      font-size: 1.2rem;
      position: relative;

      span {
        display: none;
        position: fixed;
        background: #fff;
        color: #333;
        font-weight: 600;
        letter-spacing: 1px;
        z-index: 10;
        border-radius: 3px;
        padding: 4px 16px;
        opacity: 0;
        transition: opacity 200ms ease;
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
         
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
        onBlur={() => props.onBlur(props.todo)}
        >
          {props.todo.name}
          <span>edit</span>
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
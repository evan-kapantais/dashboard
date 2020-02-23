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

    button {
      margin-left: 0.5rem;
      cursor: pointer;
    }
  }
`

 const TodoItem = (props) => {
  return (
    <StyledItem>
        <p>{props.todo.name}</p>
        <div>
          <Checkmark
          checked={props.todo.completed}
          markCompleted={() => props.markCompleted(props.todo)}
          />
          <button
          onClick={() => props.deleteItem(props.todo)}
          >
            delete
          </button>
        </div>
    </StyledItem>
  );
}

export default TodoItem;
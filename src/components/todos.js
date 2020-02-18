import React from 'react'
import styled from 'styled-components'

const StyledTodos = styled.div `
  h1 {
    border-bottom: 1px solid #fff;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin: 1rem 0;

      input[type="checkbox"] {
        background: transparent;
        width: 24px;
        height: 24px;
        border-radius: 50%;

      }
    }
  }

  form {
    input {
      background: transparent;
      color: #fff;
      outline: none;
      border: none;
      border-bottom: 1px solid #fff;
      margin-right: 1rem;

      &:focus {
        border-bottom: 1px solid lightskyblue;
      }
      
      ::placeholder {
        color: lightgrey;
      }
    }
  }
`

const Item = styled.li `

`

export default class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      todos: []
    }
  }

  componentDidMount() {
    let storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos !== null) {
      this.setState({
        todos: [...storedTodos]
      });
    } else {
      localStorage.setItem('todos', '[]');
    }
  }

  componentDidUpdate() {
        
  }

  onChange = (e) => {
    this.setState({
      inputValue: e.target.value
    });
  }

  addTodo = (e) => {
    e.preventDefault();
    this.setState({
      inputValue: '',
      todos: [...this.state.todos, this.state.inputValue],
    });
  }

  render() {
    return (
      <StyledTodos>
        <h1>Todo</h1>
        <ul>
          {this.state.todos.map(todo => 
            <li key={todo}>
              {todo}
              <label>One
                <input type='checkbox'/>
                <span/>
              </label>
            </li>  
          )}
        </ul>
        <form onSubmit={this.addTodo}>
          <input type="text" value={this.state.inputValue} onChange={this.onChange} placeholder='new todo' required />
          <button type='submit'>Add Todo</button>
        </form>
      </StyledTodos>
    );
  }
}
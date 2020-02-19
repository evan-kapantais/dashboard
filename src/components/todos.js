import React from 'react'
import styled from 'styled-components'
import Checkmark from './checkmark'

const StyledTodos = styled.div `
  background: rgba(0, 0, 0, 0.5);
  padding: 2rem;
  border-radius: 5px;

  h1 {
    border-bottom: 1px solid #fff;
    margin: 0;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin: 1rem 0;
      display: flex;
      justify-content: space-between;
      align-items: center;

      p {
        margin: 0;
      }
    }
  }

  form {
    padding: 0;
    margin: 4rem 0 0 0;
    display: flex;
    justify-content: space-between;

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

export default class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      todos: [
        {
          name: 'do the dishes',
          completed: false
        },
        {
          name: 'complete task',
          completed: true
        },
        {
          name: 'apply to job',
          completed: false
        },
        {
          name: 'do the sound design',
          completed: false
        },
        {
          name: 'complete dashboard project',
          completed: true
        },
      ]
    }
  }

  componentDidMount() {
    
  }

  componentDidUpdate() {
    console.log(this.state.todos);
  }

  markCompleted(todo) {
    let index = null;
    let newList = [];

    for (let i = 0; i < this.state.todos.length; ++i) {
      if (this.state.todos[i].name === todo.name) {
        index = i;
        newList = [...this.state.todos.slice(0, index), {name: todo.name, completed: !todo.completed}, ...this.state.todos.slice(index + 1)];
      }
    }

    this.setState({
      todos: newList
    });
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
      todos: [...this.state.todos, {name: this.state.inputValue, completed: false}],
    });
    console.log(this.state.todos);
  }

  render() {
    return (
      <StyledTodos>
        <h1>Todo</h1>
        <ul>
          {this.state.todos.map(todo => 
            <li key={todo.name}>
              <p>{todo.name}</p>
              <Checkmark 
              checked={todo.completed}
              markCompleted={() => this.markCompleted(todo)}
              />
            </li>
          )}
        </ul>
        <form onSubmit={this.addTodo}>
          <input
          type="text" 
          value={this.state.inputValue} 
          onChange={this.onChange} 
          placeholder='new todo' 
          required
          />
          <button type='submit'>Add Todo</button>
        </form>
      </StyledTodos>
    );
  }
}
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
    margin: 4rem 0;

    li {
      margin: 1.5rem 0;
      display: flex;
      justify-content: space-between;
      align-items: center;

      div {
        display: flex;
        align-items: center;

        button {
          margin-left: 0.5rem;
          background: transparent;
          border: none;
          cursor: pointer;
        }
      }
    }
  }

  form {
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
      todos: []
    }
  }

  componentDidMount = () => {
    const storedList = JSON.parse(localStorage.getItem('todos'));

    this.setState({
      todos: [...storedList]
    });
  }

  markCompleted = (todo) => {
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

    localStorage.setItem('todos', JSON.stringify(newList));
  }

  deleteItem = (todo) => {
    let filteredList = this.state.todos.filter(item => item.name !== todo.name);
    localStorage.setItem('todos', JSON.stringify(filteredList));

    this.setState({
      todos: filteredList
    });
  }

  onChange = (e) => {
    this.setState({
      inputValue: e.target.value
    });
  }

  addTodo = (e) => {
    e.preventDefault();

    const newItem = {name: this.state.inputValue, completed: false};
    let storedList = JSON.parse(localStorage.getItem('todos'));
    let newList = [];

    if (storedList === null) {
      newList = [newItem];
    } else {
      newList = [...storedList, newItem];
    }

    localStorage.setItem('todos', JSON.stringify(newList));

    this.setState({
      inputValue: '',
      todos: [...this.state.todos, {name: this.state.inputValue, completed: false}],
    });
  }

  render() {
    return (
      <StyledTodos>
        <h1>Todo</h1>
        <ul>
          {this.state.todos.map(todo => 
            <li key={todo.name}>
              <p>{todo.name}</p>
              <div>
                <Checkmark 
                checked={todo.completed}
                markCompleted={() => this.markCompleted(todo)}
                />
                <button
                onClick={() => this.deleteItem(todo)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                </button>
              </div>
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
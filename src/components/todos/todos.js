import React from 'react'
import styled from 'styled-components'

import TodoItem from './todo-item'

const StyledTodos = styled.div `
  max-width: 20rem;
  max-height: 400px;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.1);

  h1 {
    border-bottom: 1px solid #fff;
    margin: 0;
  }

  ul {
    margin: 2rem 0;
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
      flex: 4;

      &:focus {
        border-bottom: 1px solid lightskyblue;
      }
      
      ::placeholder {
        color: lightgrey;
      }
    }
    button {
      flex: 1;
    }
  }
`

const ShowCompleted = styled.div `
  button:first-child {
    background: transparent;
    border: none;
    color: inherit;
    outline: none;
  }

  i {
    display: inline-block;
    margin-left: 0.6rem;
    width: 5px;
    height: 5px;
    border-bottom: 2px solid #fff;
    border-right: 2px solid #fff;
    transform: translateY(-3px) rotate(45deg);
    transition: all 200ms ease;
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
      todos: storedList || []
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
          {this.state.todos
          .filter(todo => todo.completed === false)
          .map(todo =>
            <TodoItem
            todo={todo}
            key={todo.name}
            markCompleted={this.markCompleted}
            deleteItem={this.deleteItem}
            />
          )}
        </ul>
        <ShowCompleted>
          <button>Show Completed</button>
          <ul>
            {this.state.todos
            .filter(todo => todo.completed === true)
            .map(todo => 
              <TodoItem
              todo={todo}
              key={todo.name}
              markCompleted={this.markCompleted}
              deleteItem={this.deleteItem}
              />
            )}
          </ul>
        </ShowCompleted>
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
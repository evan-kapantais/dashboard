import React from 'react'
import styled from 'styled-components'

import TodoItem from './todo-item'

const StyledTodos = styled.div `
  position: relative;
  width: 400px;
  height: 500px;
  padding: 1rem;
  border-radius: 5px;
  overflow: hidden;
  /* background: rgba(255, 255, 255, 0.1); */
  /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); */

  header {
    border-bottom: 1px solid #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      background: transparent;
      padding: 5px 10px;
      color: inherit;
      cursor: pointer;
    }
  }

  main {
    display: block;
    overflow-y: auto;
    overflow-x: hidden;
    height: 82%;
    padding-right: 0.5rem;

    ::-webkit-scrollbar {
      width: 5px;
    }

    ::-webkit-scrollbar-track {
      background: #f1f1f1; 
      border-radius: 5px;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background: #888; 
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #555; 
    }
  }

  ul {
    margin: 2rem 0;
  }

  footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    
    form {
      display: flex;
      justify-content: space-between;
      flex: 1;

      input {
        background: transparent;
        color: #fff;
        outline: none;
        border: none;
        padding: 0.5rem;
        border-bottom: 1px solid #fff;
        font-size: 1rem;
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
        cursor: pointer;
        background: transparent;
        color: inherit;
      }
    }
  }

`

const CompletedList = styled.div `
  display: ${props => props.shown === true ? 'auto' : 'none'};
  margin-top: 2rem;

  hr {
    border: 1px solid rgba(255, 255, 255, 0.5);
  }

  p:first-child {
    text-decoration: underline;
  }
`

export default class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      todos: [],
      completedShown: false
    }
  }

  componentDidMount = () => {
    const storedList = JSON.parse(localStorage.getItem('todos'));
    const storedCompletedShown = JSON.parse(localStorage.getItem('completedShown'));

    this.setState({
      todos: storedList || [],
      completedShown: storedCompletedShown
    });
  }

  toggleCompleted = () => {

    this.setState({
      completedShown: !this.state.completedShown
    });

    localStorage.setItem('completedShown', !this.state.completedShown);
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

  onBlur = (todo) => {
   
  }

  render() {
    return (
      <StyledTodos>
        <header>
          <h1>Todo</h1>
          <button onClick={this.toggleCompleted}>Show Completed</button>
        </header>
        <main>  
          <ul>
            {this.state.todos
            .filter(todo => todo.completed === false)
            .map(todo =>
              <TodoItem
              todo={todo}
              key={todo.name}
              markCompleted={this.markCompleted}
              deleteItem={this.deleteItem}
              onMouseEnter={this.onMouseEnter}
              onMouseLeave={this.onMouseLeave}
              onBlur={this.onBlur}
              />
            )}
          </ul>
          <CompletedList shown={this.state.completedShown}>
            {/* <p>Completed</p> */}
            <hr/>
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
          </CompletedList>
        </main>
        <footer>
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
        </footer>
      </StyledTodos>
    );
  }
}
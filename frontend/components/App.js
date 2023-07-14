import React from 'react';
import axios from 'axios';
import Form from './Form';
import TodoList from './TodoList';

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
      todos: [],
      error: '',
      todoInput: '',
      displayCompleted: true
    }
  

  changeToInput = evt => {
    const {value} = evt.target
    this.setState({...this.state, todoInput: value})
  }

  resetInput = () => {
    this.setState({...this.state, todoInput: ''})
  }

  setResErr = (err) => {
    this.setState({...this.state, error: err.response.data.message})
  }

  postTodo = () => {
    axios.post(URL, {name: this.state.todoInput})
      .then(res => {
        this.setState({...this.state, todos: this.state.todos.concat(res.data.data)});
        this.resetInput();
      })
      .catch(this.setResErr)
  }
  
  todoSubmit = (evt) => {
    evt.preventDefault();
    this.postTodo();
  }

  getTodos = () => {
    axios.get(URL)
      .then(res => {
        this.setState({...this.state, todos: res.data.data});
      })
      .catch(this.setResErr)
  }

  toggleComplete = id => () => {
    axios.patch(`${URL}/${id}`)
      .then(res => {
        this.setState({
          ...this.state, todos: this.state.todos.map(td => {
            if(td.id !== id) return td
            return res.data.data
          })
        })
      })
      .catch(this.setResErr)
  }

  toggleDisplayCompleted = () => {
    this.setState({...this.state, displayCompleted: !this.state.displayCompleted})
  }

  componentDidMount() {
    this.getTodos();
  }
  
  render() {
    return (
      <div>
        <div id='error'>{this.state.error}</div>
        <TodoList 
          todos = {this.state.todos}
          displayCompleted={this.state.displayCompleted}
          toggleComplete={this.toggleComplete}
        />
        <Form 
          todoSubmit={this.todoSubmit}
          todoInput={this.state.todoInput}
          changeToInput={this.changeToInput}
          toggleDisplayCompleted={this.toggleDisplayCompleted}
          displayCompleted={this.state.displayCompleted}
        />
      </div>
    )
  }
}

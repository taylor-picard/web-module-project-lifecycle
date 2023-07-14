import React from 'react';
import axios from 'axios';

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
        <div id='todos'>
          <h2>Todos:</h2>
          {
            this.state.todos.reduce((acc,td) => {
              if(this.state.displayCompleted || !td.completed) return acc.concat(
                <div onClick={this.toggleComplete(td.id)} key={td.id}>{td.completed ? '✔️ ' : ''}{td.name}</div>
              )
              return acc
            },[])
          }
        </div>
        <form 
          id='todoform'
          onSubmit={this.todoSubmit}>
          <input 
            type='text' 
            placeholder='New Todo' 
            value={this.state.todoInput}
            onChange={this.changeToInput}
          />
          <input type='submit'/>
          <button onClick={this.toggleDisplayCompleted}>{this.state.displayCompleted ? 'Hide':'Show'} Completed</button>
        </form>
      </div>
    )
  }
}

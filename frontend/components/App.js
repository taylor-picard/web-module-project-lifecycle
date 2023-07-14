import React from 'react';
import axios from 'axios';

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  
  constructor(){
    super();
    this.state = {
      todos: []
    }
  }

  fetchTodos = () => {
    axios.get(URL)
      .then(res => {
        this.setState({...this.state, todos: res.data.data});
      })
      .catch(err => {
        this.setState({...this.state, error: err.res.data.message})
      })
  }

  componentDidMount() {
    //fetch todos from server
    this.fetchTodos();
  }
  
  render() {
    return (
      <div>
        <div id='error'>Error: {this.state.error}</div>
        <div id='todos'>
          <h2>Todos:</h2>
          {
            this.state.todos.map(td => {
              return <div key={td.id}>{td.name}</div>
            })
          }
        </div>
        <form id='todoform'>
          <input type='text' placeholder='New Todo'></input>
          <input type='submit'></input>
          <button>Clear Completed</button>
        </form>
      </div>
    )
  }
}

import React from 'react'

export default class Form extends React.Component {
  render() {
    return (
      <form 
          id='todoform'
          onSubmit={this.props.todoSubmit}>
          <input 
            type='text' 
            placeholder='New Todo' 
            value={this.props.todoInput}
            onChange={this.props.changeToInput}
          />
          <input type='submit'/>
          <button onClick={this.props.toggleDisplayCompleted}>{this.props.displayCompleted ? 'Hide':'Show'} Completed</button>
        </form>
    )
  }
}

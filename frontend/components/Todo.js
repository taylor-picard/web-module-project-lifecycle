import React from 'react'

export default class Todo extends React.Component {
  render() {
    return (
      <div onClick={this.props.toggleComplete(this.props.todo.id)} >{this.props.todo.completed ? '✔️ ' : ''}{this.props.todo.name}</div>
    )
  }
}

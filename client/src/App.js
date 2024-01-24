import React, {useState} from "react"
import ToDoList from './components/ToDoList'


class App extends React.Component {
  state = {
    name: ""
  }

  render() {
    return (
      <div>
        <ToDoList/>
      </div>
    )
  }
}

export default App
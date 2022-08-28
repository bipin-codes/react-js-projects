import logo from "./logo.svg";
import "./App.css";
import React from "react";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      monsters: [{ name: "Linda" }, { name: "Frank" }, { name: "Jacky" }],
    };
  }

  render() {
    return (
      <div className="App">
        {this.state.monsters.map((monster, index) => (
          <h1 key={index}>{monster.name}</h1>
        ))}
      </div>
    );
  }
}

export default App;

import React from "react";
import "./App.css";
import Character from "./components/Character";

const App = () => {
  return (
    <div className="App">
      <Character />
      <div className="container">
        <h1>Rick and Morty</h1>
      </div>
    </div>
  );
};

export default App;

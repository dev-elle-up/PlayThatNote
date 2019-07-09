import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Start from './components/Start.js';
import Game from './components/Game.js';
import Summary from './components/Summary.js';


class App extends Component {
  constructor(){
    super();
    this.state={
      notes_played_correctly: 0,
      notes_skipped: 0,
      time_started: null,
      time_stopped: null,
      time_played: null,
    }
  }


  render(){
    return (
      <section className="App">


        <h1>Play That Note</h1>
        <Start />
        <Game />
        <Summary />

      </section>
    );
  }
}

export default App;

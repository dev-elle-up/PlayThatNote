import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Start from './components/Start.js';
import Game from './components/Game.js';
import Summary from './components/Summary.js';
// import Time from 'time'; // CHECK ON THIS!!


class App extends Component {
  constructor(){
    super();
    this.state={
      gameState: 'Start Page',

      notes_played_correctly: 0,
      notes_skipped: 0,
      time_started: null, //this becomes undefined by startTimer, fix later
      time_stopped: null,
      time_played: null,
    }
  }

  startTimer = () => {
    this.setState({
      time_started: Date.now
    })
    console.log('in startTimer', this.state.time_started);
  }


  render(){
    return (
      <section className="App">

        <h1>Play That Note</h1>

        {this.state.gameState==='Start Page' && <Start
          startTimerCallback={this.startTimer}
        />}

        {this.state.gameState==='Playing' && <Game />}

        {this.state.gameState==='Summary Page' && <Summary />}

      </section>
    );
  }
}

export default App;

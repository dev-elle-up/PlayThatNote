import React, { Component } from 'react';
// import logo from './logo.svg';
import Start from './components/Start.js';
import Game from './components/Game.js';
import Summary from './components/Summary.js';
// import Time from 'time'; // CHECK ON THIS!!

import 'bulma/css/bulma.min.css';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state={
      gameState: 'Start Page',

      notes_played_correctly: 0,
      notes_skipped: 0,
      time_started: null,
      time_stopped: null,
      time_played: null,
    }
  }

  startGame = () => {
    this.setState({
      time_started: Date.now(),
      gameState: 'Game Page',
      notes_played_correctly: 0,
      notes_skipped: 0,
      time_stopped: null,
      time_played: null,
    })
    // console.log('in App, startGame(), time started: ', this.state.time_started);
    // console.log('in App, startGame(), gameState: ', this.state.gameState);
  }

  finishGame = () => {
    this.setState({
      time_stopped: Date.now,
      gameState: 'Summary Page'
    })

    // FIX THIS - TIMER NEEDS TO SHOW MINUTES AND SECONDS ELAPSED
    let timeElapsed = (this.state.time_stopped - this.state.time_started);
    let timeDiff = new Date(timeElapsed)
    let timePlayedString = timeDiff.getSeconds()
    this.setState({
      time_played: timePlayedString
    })
    // console.log('time started: ', this.state.time_started);
    // console.log('time stopped: ', this.state.time_stopped);
    // console.log('time elapsed: ', this.state.timeElapsed);
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  }


  render(){
    return (
      <div className="App">
        <section className="hero is-fullheight">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Play That Note</h1>

            {this.state.gameState==='Start Page' && <Start
              startGameCallback={this.startGame}
            />}

            {this.state.gameState==='Game Page' && <Game
              finishGameCallback={this.finishGame}
            />}

            {this.state.gameState==='Summary Page' && <Summary
              notes_played_correctly={this.state.notes_played_correctly}
              notes_skipped={this.state.notes_skipped}
              time_played={this.state.time_played}
              restartGameCallback={this.startGame}
            />}
          </div>
        </div>
      </section>
    </div>
    );
  }
}

export default App;

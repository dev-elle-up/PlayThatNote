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

      notesPlayedCorrectly: 0,
      notesSkipped: 0,
      notesTried: -1,
      timeStarted: null,
      timeStopped: null,
      timePlayed: '',
    }
    console.log(process.env.NODE_ENV);
  }

  startGame = () => {
    this.setState({
      timeStarted: Date.now(),
      gameState: 'Game Page',
      notesPlayedCorrectly: 0,
      notesSkipped: 0,
      timeStopped: null,
      timePlayed: '',
    })
    // console.log('in App, startGame(), time started: ', this.state.time_started);
    // console.log('in App, startGame(), gameState: ', this.state.gameState);
  }

  increaseSkippedCount = () => {
    const newSkippedCount = this.state.notesSkipped + 1;
    this.setState({notesSkipped: newSkippedCount});
  }

  increaseNotesPlayedCorrectly = () => {
    const newNotesPlayedCorrectlyCount = this.state.notesPlayedCorrectly + 1;
    this.setState({notesPlayedCorrectly: newNotesPlayedCorrectlyCount});
  }

  increaseNotesTried = () => {
    const newNotesTried = this.state.notesTried +1;
    this.setState({notesTried: newNotesTried});
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
        <section className="hero is-medium">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Play That Note</h1>

            {this.state.gameState==='Start Page' && <Start
              startGameCallback={this.startGame}
            />}

            {this.state.gameState==='Game Page' && <Game
              finishGameCallback={this.finishGame}
              increaseSkippedCountCallback={this.increaseSkippedCount}
              increaseNotesPlayedCorrectlyCallback={this.increaseNotesPlayedCorrectly}
              increaseNotesTriedCallback={this.increaseNotesTried}
            />}

            {this.state.gameState==='Summary Page' && <Summary
              notesPlayedCorrectly={this.state.notesPlayedCorrectly}
              notesSkipped={this.state.notesSkipped}
              notesTried={this.state.notesTried}
              timePlayed={this.state.timePlayed}
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

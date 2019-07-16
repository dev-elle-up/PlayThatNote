import React, { Component } from 'react';
import Analyzer from './Analyzer.js';

class Game extends Component {
  constructor(props){
    super(props);
    this.state={
      // last_propmted_note: null,
      // current_prompted_note: null,
      currentUserNote: null,
      // note_matched: false
    }

  }

  getCurrentUserNote = (note) => {
    this.setState({currentUserNote: note})
    console.log('in game, currentUserNote: ', this.state.currentUserNote);
  }

  componentWillUnmount() {
    if (this.state.processor){this.state.processor.disconnect()};
  }


  showMeTheState = () => {
    // console.log('in showMeTheState, userAudioFromMic: ', this.state.userAudioFromMic);
    // console.log('in showMeTheState, userAudioFromMic type: ', typeof this.state.userAudioFromMic);

    // const numOfMics = this.state.userAudioFromMic.mediaStream.getAudioTracks();
    // console.log('numOfMics: ', numOfMics);

    // TEST
    // const audioTracks = this.state.userAudioFromMic.getAudioTracks();
    // console.log('audioTracks: ', audioTracks);

  }


  render() {

    return(
      <section>
        <p className="heading"> This is where the game goes!</p>
        <div className="buttons">
          <button className="button is-small" onClick={this.giveHint}>hint</button>
          <button className="button is-small" onClick={this.skipNote}>skip</button>
          <button className="button is-small" onClick={this.props.finishGameCallback}>finished</button>
          <button className="button is-small" onClick={this.showMeTheState}>show me the state</button>
        </div>
        <Analyzer
          getCurrentUserNoteCallback={this.getCurrentUserNote}/>
      </section>
    );
  }
}

export default Game;

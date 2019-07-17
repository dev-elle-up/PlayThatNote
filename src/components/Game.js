import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Analyzer from './Analyzer.js';
import notes from './NoteDetails';

class Game extends Component {
  constructor(props){
    super(props);
    this.state={
      lastPromptedNoteNum: null,
      promptedNoteNum: null,
      promptedNoteLetter: null,
      userPlayingNote: null,
      // note_matched: false
    }

  }

  componentDidMount() {
    this.getRandomIntInclusive(16, 42);
  }

  getRandomIntInclusive(min, max) {
      const randInt = Math.floor(Math.random() * (max - min + 1)) + min;
      this.setState({promptedNoteNum: randInt});
      console.log('randInt: ', randInt);
      this.getNoteDetails(randInt);
    // while (randInt === this.lastPromptedNoteNum || this.lastPromptedNoteNum === null);
  }

  getNoteDetails(noteNum) {
    let note = notes.noteNum;
    this.setState({promptedNoteLetter: note.noteName})
  }

  getUserPlayingNote = (note) => {
    this.setState({userPlayingNote: note})
    // console.log('in game, userPlayingNote: ', this.state.userPlayingNote);
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
          <p>Play this note:</p>
          <p></p>
        </div>
        <Analyzer
          getUserPlayingNoteCallback={this.getUserPlayingNote}/>
      </section>
    );
  }
}

Game.propTypes = {
  finishGameCallback: PropTypes.func.isRequired
};


export default Game;

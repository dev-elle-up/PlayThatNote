import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Analyzer from './Analyzer.js';
import Notes from './NoteDetails.js';
import Info from './Info.js';

class Game extends Component {
  constructor(props){
    super(props);
    this.state={
      lastPromptedNoteNum: null,
      promptedNoteNum: null,
      promptedNoteLetter: null,
      userPlayingNote: null,
      // note_matched: false
      infoShown: false
    }
  this.toggleInfoShown = this.toggleInfoShown.bind(this);
}

toggleInfoShown () {
  this.setState({ infoShown: !this.state.infoShown });
}

  componentDidMount() {
    this.setNewNote();
  }


  setNewNote() {
    const noteNum = this.getRandomIntInclusive(16, 42);
    // while (randInt === this.lastPromptedNoteNum || this.lastPromptedNoteNum === null);
    const noteDetails = this.getNoteDetails(noteNum);
    this.setState({
      promptedNoteNum: noteNum,
      promptedNoteLetter: noteDetails.noteName,
    });
  }

  getRandomIntInclusive(min, max) {
      const randInt = Math.floor(Math.random() * (max - min + 1)) + min;
      console.log('randInt: ', randInt);
      return randInt;
  }

  getNoteDetails(noteNum) {
    // noteNum = 16;
    let note = Notes[noteNum];
    console.log('note: ', note);
    return note;
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
          <button className="button" onClick={this.toggleInfoShown}>INFO</button>
          {this.state.infoShown ? <Info toggleInfoShownCallback={this.toggleInfoShown} /> : ''}
      </section>
    );
  }
}

Game.propTypes = {
  finishGameCallback: PropTypes.func.isRequired
};


export default Game;

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
      promptedNoteFreq: null,
      targetFreqRangeLower: null,
      targetFreqRangeUpper: null,
      userPlayingNote: null,
      noteMatched: false,
      infoShown: false
    }
  this.toggleInfoShown = this.toggleInfoShown.bind(this);
  this.increaseSkippedCountCallback = props.increaseSkippedCountCallback.bind(this);
  }

  toggleInfoShown () {
    this.setState({ infoShown: !this.state.infoShown });
  }

  componentDidMount() {
    this.setNewNote();
  }

  setNewNote() {
    let noteNum = null;
    let noteDetails = null;
    while(noteNum === null || noteDetails === undefined || noteNum === this.state.lastPromptedNoteNum) {
      noteNum = this.getRandomIntInclusive(16, 42);
      console.log('noteNum in setNewNote: ', noteNum);
      noteDetails = this.getNoteDetails(noteNum);
    }

// the next three lines might need to move up into the setNewNote function
    const targetFreq = noteDetails.frequency
    let targetFreqRangeLower = (targetFreq-(targetFreq*0.02806))
    let targetFreqRangeUpper = (targetFreq+(targetFreq*0.02973))
//            ^^^^ those three lines ^^^

    this.setState({
      promptedNoteNum: noteNum,
      promptedNoteLetter: noteDetails.noteName,
      promptedNoteFreq: noteDetails.frequency,
      targetFreqRangeLower: targetFreqRangeLower,
      targetFreqRangeUpper: targetFreqRangeUpper
    });

    console.log(`promptedNoteNum: ${this.state.promptedNoteNum}, promptedNoteFreq: ${this.state.promptedNoteFreq}, promptedNoteLetter: ${this.state.promptedNoteLetter}, Acceptable Frequency Range: ${this.state.targetFreqRangeLower}Hz - ${this.state.targetFreqRangeUpper}Hz`);
  }

  getRandomIntInclusive(min, max) {
      const randInt = Math.floor(Math.random() * (max - min + 1)) + min;
      console.log('randInt in getRandomIntInclusive: ', randInt);
      return randInt;
  }

  getNoteDetails(noteNum) {
    let note = Notes[noteNum];
    console.log('note: ', note);
    return note;
  }

  getUserPlayingNote = (note) => {
    this.setState({userPlayingNote: note})
    // console.log('in game, userPlayingNote: ', this.state.userPlayingNote);
    if (note <= this.state.targetFreqRangeUpper && note >= this.state.targetFreqRangeLower) {
      this.toggleNoteMatched();
    }
  }

  toggleNoteMatched = () => {
    this.state.noteMatched ? this.setState({noteMatched: true}) : this.setState({noteMatched: true})
    console.log(this.state.noteMatched);
  }

  componentWillUnmount() {
    if (this.state.processor){this.state.processor.disconnect()};
  }

  skipNote = () => {
    this.increaseSkippedCountCallback();
    this.setNewNote();
  }

  debugHelper = () => {
    this.setNewNote();
  }


  render() {

    return(
      <section>
        <p className="heading"> This is where the game goes!</p>
        <div className="buttons">
          <button className="button is-small" onClick={this.giveHint}>hint</button>
          <button className="button is-small" onClick={this.skipNote}>skip</button>
          <button className="button is-small" onClick={this.props.finishGameCallback}>finished</button>
          <button className="button is-small" onClick={this.debugHelper}>debugHelper action</button>
        </div>
        <p>Play this note:</p>
        <p>{this.state.promptedNoteLetter}</p>

        <Analyzer
          getUserPlayingNoteCallback={this.getUserPlayingNote}
          />
          <div>
            <button className="button" onClick={this.toggleInfoShown}>INFO</button>
            {this.state.infoShown ? <Info toggleInfoShownCallback={this.toggleInfoShown} /> : ''}
          </div>
      </section>
    );
  }
}

Game.propTypes = {
  finishGameCallback: PropTypes.func.isRequired,
  increaseSkippedCountCallback: PropTypes.func.isRequired
};


export default Game;

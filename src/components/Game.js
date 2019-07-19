import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Analyzer from './Analyzer.js';
import Notes from './NoteDetails.js';
import Info from './Info.js';

class Game extends Component {
  constructor(props){
    super(props);
    this.state={
      lastPromptedNoteNum: null, // noteObject.noteNum
      promptedNoteNum: null, // noteObject.noteNum
      promptedNoteLetter: null,
      promptedNoteFreq: null,
      targetFreqRangeLower: null,
      targetFreqRangeUpper: null,

      userPlayingPitch: null,
      noteMatched: false,
      startTime: null,
      targetTime: null,
      targetTimeReached: false,

      infoShown: false,

      availableNotes: []
    }
  this.toggleInfoShown = this.toggleInfoShown.bind(this);
  this.increaseSkippedCountCallback = props.increaseSkippedCountCallback.bind(this);
  // this.testAvailableNotes = this.availableNotes.bind(this)
  }

  toggleInfoShown () {
    this.setState({ infoShown: !this.state.infoShown });
  }

  componentDidMount() {
    // console.log('Component mounted. notes in state: ', this.state.availableNotes);
    async function getAvail() {
      await this.getAvailableNotes();
      await this.setNewNote();
    }
    getAvail();
  };

  getAvailableNotes() {
    const allNotes= Notes;
    const availableNotes = allNotes.map(
      note => {
        return note;
    });
    this.setState({ availableNotes }, () => {console.log(this.state.availableNotes, this.state.availableNotes.length);})
  };

  setNewNote = () => {

    this.setState({lastPromptedNoteNum: this.state.promptedNoteNum});
    const numOfNotesAvailable = this.state.availableNotes.length;
    console.log(`numOfNotesAvailable: ${numOfNotesAvailable}`);
    let lastNoteIndex = null;
    let noteIndex = null;
    let noteObject = null;
    // while(noteIndex === lastNoteIndex) { // removed condition noteObject === undefined ||
      const newNoteIndex = this.getRandomIntInclusive(0, numOfNotesAvailable);
      this.noteIndex = newNoteIndex;
      noteObject = this.state.availableNotes[noteIndex];
      console.log(`Random new noteIndex in setNewNote: ${noteIndex}, lastNoteIndex: ${lastNoteIndex}`);
    // }

    const difficultyModifier = 0.5
    const targetFreq = noteObject.frequency
    let targetFreqRangeLower = (targetFreq-(targetFreq*0.02806)*difficultyModifier)
    let targetFreqRangeUpper = (targetFreq+(targetFreq*0.02973)*difficultyModifier)

    this.setState({
      promptedNoteNum: noteObject.noteNum,
      // promptedNoteLetter: noteObject.noteName,
      promptedNoteLetter: noteObject.noteNameOctave,
      promptedNoteFreq: noteObject.frequency,
      targetFreqRangeLower: targetFreqRangeLower,
      targetFreqRangeUpper: targetFreqRangeUpper
    }, () => {
      console.log(`***** End of setNewNote ***** lastPromptedNoteNum: ${this.state.lastPromptedNoteNum}, current promptedNoteNum: ${this.state.promptedNoteNum}, promptedNoteLetter: ${this.state.promptedNoteLetter}`)
    });
    // promptedNoteFreq: ${this.state.promptedNoteFreq}, Acceptable Frequency Range: ${this.state.targetFreqRangeLower}Hz - ${this.state.targetFreqRangeUpper}Hz
  }

  getRandomIntInclusive(min, max) {
      const randInt = Math.floor(Math.random() * (max - min + 1)) + min;
      console.log('randInt in getRandomIntInclusive: ', randInt);
      return randInt;
  }

  // getNoteDetails(noteNum) {
  //   let note = Notes[noteNum];
  //   console.log('note: ', note);
  //   return note;
  // }

  getuserPlayingPitch = (pitch) => {
    const oldPitch = this.state.userPlayingPitch;

    if (oldPitch !== pitch ){
      this.setState({userPlayingPitch: pitch}, ()=>{
        // console.log('in game, userPlayingPitch: ', this.state.userPlayingPitch);
        if (pitch <= this.state.targetFreqRangeUpper && pitch >= this.state.targetFreqRangeLower) {
          this.toggleNoteMatched();
        }
      });
    }

    // add an else here to reset state to false if the time requirement isn't reached
  }

  toggleNoteMatched = () => {
    // this.state.noteMatched ? this.setState({noteMatched: false}) : this.setState({noteMatched: true})
    this.setState({noteMatched: true},()=>{
      console.log(this.state.noteMatched);
    });

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
          getuserPlayingPitchCallback={this.getuserPlayingPitch}
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

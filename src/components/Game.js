import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Analyzer from './Analyzer.js';
import { notes } from './NoteDetails.js';
import Info from './Info.js';

class Game extends Component {
  constructor(props){
    super(props);
    this.state={
      lastPrompedNote: null,
      promptedNote: null,
      promptedNoteLetter: null,
      targetFreqRangeLower: null,
      targetFreqRangeUpper: null,
      promptedNoteFreq: 'loading',

      userPlayingPitch: null, //number, Hz
      noteMatched: false,
      startTime: null,
      targetTime: null,
      targetTimeReached: false,

      infoShown: false,

      availableNotes: notes
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

// USE THIS WHEN ADDING FILTERS (DIFFICULTY LEVEL, SINGLE STRING, WHOLE NOTES ONLY, ETC)
  // getAvailableNotes() {
  //   const allNotes= Notes;
  //   const availableNotes = allNotes.map(
  //     note => {
  //       return note;
  //   });
  //   this.setState({ availableNotes }, () => {console.log(this.state.availableNotes, this.state.availableNotes.length);})
  // };

  setNewNote = () => {
    let lastNote = this.state.promptedNote;
    let availableNotes = this.state.availableNotes;
    let newNote = lastNote;
    console.log(`**** numOfNotesAvailable: ${availableNotes.length} ****`);
    console.log(`lastNote: ${lastNote}, newNote: ${newNote}`);


    while(newNote === lastNote) {
      const newNoteIndex = this.getRandomIntInclusive(0, availableNotes.length-1);
      newNote = availableNotes[newNoteIndex];
      console.log(`Random new noteIndex in while loop: ${newNoteIndex}`);
    }
    this.setState({lastPromptedNote: lastNote, promptedNote: newNote});
    console.log(`new noteNum: ${newNote}, lastNoteNum: ${lastNote}`);


    const difficultyModifier = 0.7
    const targetFreq = newNote.frequency
    let targetFreqRangeLower = (targetFreq-(targetFreq*0.02806)*difficultyModifier)
    let targetFreqRangeUpper = (targetFreq+(targetFreq*0.02973)*difficultyModifier)

    this.setState({
      // promptedNoteLetter: newNote.noteName,
      promptedNoteLetter: newNote.noteNameOctave, // CHANGE THIS ONCE GRAPHPICS ARE IN!
      promptedNoteFreq: newNote.frequency,
      targetFreqRangeLower: targetFreqRangeLower,
      targetFreqRangeUpper: targetFreqRangeUpper
    });
  }

  getRandomIntInclusive(min, max) {
      const randInt = Math.floor(Math.random() * (max - min + 1)) + min;
      console.log('randInt in getRandomIntInclusive: ', randInt);
      return randInt;
  }

  getuserPlayingPitch = (pitch) => {
    const oldPitch = this.state.userPlayingPitch;

    if (oldPitch !== pitch ){
      this.setState({userPlayingPitch: pitch}, ()=>{
        console.log(`pitch changed to: ${pitch}`);

        if (pitch <= this.state.targetFreqRangeUpper && pitch >= this.state.targetFreqRangeLower) { // inside target range
          this.setNoteMatchedTrue();
          this.checkTargetTimeReached();

        } else if (pitch > this.state.targetFreqRangeUpper || pitch < this.state.targetFreqRangeLower){ // outside target range
          this.setNoteMatchedFalse();

          const targetTimeReached = this.checkTargetTimeReached();
          console.log(`pitch: ${pitch}, targetTimeReached: ${targetTimeReached}`);

          if (targetTimeReached === false) {
            // this.voidTargetTime();
            console.log('void targetTime here #1');
            // this.setNoteMatchedFalse();
          } else if (targetTimeReached === true) {
            this.setNewNote();
          };
        };
      });
    }

    // add an else here to reset state to false if the time requirement isn't reached
    
  };

  setNoteMatchedTrue = () => {
    this.setState({noteMatched: true},()=>{console.log(this.state.noteMatched)});
  };

  setNoteMatchedFalse = () => {
    this.setState({noteMatched: false},()=>{console.log(this.state.noteMatched)});

  };

  checkTargetTimeReached = () => {
    const currentTime = new Date().getTime();
    const targetTime = this.state.targetTime;

    if (!this.state.targetTime) { // no timer started
      this.setTargetTime();
      return false;
    } else if (this.state.targetTime && (currentTime < targetTime)) { // targetTime not reached
      console.log('Hold that note!');
      return false;
    } else if (this.state.targetTime && (currentTime > targetTime)) { // targetTime reached
      console.log('* ... sparkles ... *');
      return true;
    } else {
      console.log('@ @ @ @ @ -- HELP! THIS STATE SHOULD NOT BE REACHABLE! -- @ @ @ @ @ ');
    }

  };



  setTargetTime = () => {
    const sustainTimeMilliseconds = 1500;
    const now = new Date().getTime();
    const newTargetTime = now + sustainTimeMilliseconds ;
    this.setState({targetTime: newTargetTime}, () => {console.log(`in setTargetTime, now: ${now}, targetTime: ${this.state.targetTime}`);});
  };

  voidTargetTime = () => {
    this.setState({targetTime: null}, () => {console.log(`in voidTargetTime, targetTime: ${this.state.targetTime}`);});
  }



  componentWillUnmount() { // NEED THIS?
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
        <p>{this.state.promptedNoteFreq}</p>

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

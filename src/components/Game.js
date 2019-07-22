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
      targetTime: null,

      infoShown: false,
      availableNotes: notes
    }
    this.toggleInfoShown = this.toggleInfoShown.bind(this);
  }


  componentDidMount() {
      this.setNewNote();
    }


  // *** GAME BUTTONS ***
  toggleInfoShown () {
    this.setState({ infoShown: !this.state.infoShown });
  }

  skipNote = () => {
    this.props.increaseSkippedCountCallback();
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


  // *** NEW NOTE GENERATOR ***
  setNewNote = () => {
    let lastNote = this.state.promptedNote;
    let availableNotes = this.state.availableNotes;
    let newNote = lastNote;

    while(newNote === lastNote) {
      const newNoteIndex = this.getRandomIntInclusive(0, availableNotes.length-1);
      newNote = availableNotes[newNoteIndex];
    }

    this.setState({lastPromptedNote: lastNote, promptedNote: newNote});


    const difficultyModifier = 0.7
    const targetFreq = newNote.frequency
    let targetFreqRangeLower = (targetFreq-(targetFreq*0.02806)*difficultyModifier)
    let targetFreqRangeUpper = (targetFreq+(targetFreq*0.02973)*difficultyModifier)

    this.setState({
      promptedNoteLetter: newNote.noteName,
      // promptedNoteLetter: newNote.noteNameOctave, // @@@@@ DELETE THIS ONCE GRAPHPICS ARE IN! @@@@@
      promptedNoteFreq: newNote.frequency,
      targetFreqRangeLower: targetFreqRangeLower,
      targetFreqRangeUpper: targetFreqRangeUpper
    });

    this.props.increaseNotesTriedCallback();

    console.log(`*** NEW NOTE *** `);
    if (lastNote) {console.log(`lastNote: ${lastNote.noteNum}`);}
    if (newNote) {console.log(`newNote: ${newNote.noteNum}`);}
  };

  getRandomIntInclusive(min, max) {
      const randInt = Math.floor(Math.random() * (max - min + 1)) + min;
      return randInt;
  }




  // *** GET USER PITCH ***
  getuserPlayingPitch = (pitch) => {
    const oldPitch = this.state.userPlayingPitch;
    console.log(`oldPitch: ${oldPitch}, newPitch: ${pitch}`);
    this.checkPitchChange(oldPitch, pitch);
  };


  // *** GAME LOGIC ***
  checkPitchChange(oldPitch, pitch) {
    if (oldPitch !== pitch ){ // pitch has changed, A or B
      this.setState({userPlayingPitch: pitch}, ()=>{console.log(`pitch changed to: ${pitch}`)});
      this.handlePitchChange(pitch);
    } else { // pitch has not changed, C
      this.handlePitchNoChange(pitch);
    };
  }

  checkPitchInRange = (pitch) => {
    if (pitch <= this.state.targetFreqRangeUpper && pitch >= this.state.targetFreqRangeLower) {return true} else {return false};
  };

  checkTimerStarted = () => {
    if (this.state.targetTime) {return true} else {return false};
  }

  handlePitchChange = (pitch) => {
    let pitchInRange = this.checkPitchInRange(pitch); // true or false
    let timerStarted = this.checkTimerStarted();
    let targetTimeReached = this.checkTargetTimeReached();

    if (pitchInRange) { // A
      if (timerStarted) { // A1
        if (targetTimeReached) { // A1a
          this.generateSparkles();
        } else { // A1b
          console.log('keep playing');
        }
      } else { // A2
          this.setTargetTime();
      }

    } else { // B note is out of target range ("wrong") or null
      if (timerStarted) { // B1
        if (targetTimeReached) { // B1a note changed to null or wrong note, timer has finished
          this.handleSuccessfulRound();
        } else { // B1b
          this.voidTargetTime();
          console.log('TIMER VOIDED (B1b)');
        }
      } else { // B2
        // do nothing
        return;
      }
    }

  };

  handlePitchNoChange(pitch) { // C
    if (this.state.targetTime && this.checkTargetTimeReached()) { // C1
      this.generateSparkles();
      console.log('sparkles in C1');
    } else { // C2
      if (pitch) {
        console.log(`Keep going, you're SO CONSISTENT!`);
      }
    }
  };


  // GAME LOGIC HELPERS
  generateSparkles = () => {
    console.log('* ... sparkles ... * success');
  };

  handleSuccessfulRound = () => {
    this.props.increaseNotesPlayedCorrectlyCallback();
    this.setNewNote();
    this.voidTargetTime();
    console.log(`You got a point! Here's a new note.`);
  }

  checkTargetTimeReached = () => {
    const currentTime = new Date().getTime();
    const targetTime = this.state.targetTime;

    if (currentTime >= targetTime) {return true} else {return false};
  };

  setTargetTime = () => {
    const sustainTimeMilliseconds = 1000;
    const now = new Date().getTime();
    const newTargetTime = now + sustainTimeMilliseconds ;
    this.setState(
      {targetTime: newTargetTime},
      () => {console.log(`in setTargetTime, now: ${now}, targetTime: ${this.state.targetTime}`);}
    );
  };

  voidTargetTime = () => {
    this.setState({targetTime: null}, () => {console.log(`in voidTargetTime, targetTime: ${this.state.targetTime}`);});
  }


  // WRAP UP
  componentWillUnmount() { // @@@@@ NEED THIS? @@@@@
    if (this.state.processor){this.state.processor.disconnect()};
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
  increaseSkippedCountCallback: PropTypes.func.isRequired,
  increaseNotesPlayedCorrectlyCallback: PropTypes.func.isRequired,
  increaseNotesTriedCallback: PropTypes.func.isRequired
};

export default Game;

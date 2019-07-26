import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Analyzer from './Analyzer.js';
import MusicCanvas from './MusicCanvas.js'
import { notes } from './NoteDetails.js';
import Info from './Info.js';
import { devLogger } from '../modules/helperFunctions.js';

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
      userPlayingNote: null, // noteNameOctave
      targetTime: null,
      noteColorFeedback: "green",

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
  //   this.setState({ availableNotes }, () => {devLogger(this.state.availableNotes, this.state.availableNotes.length);})
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



    const targetFreq = newNote.frequency
    let targetFreqRangeLower = (targetFreq-(targetFreq*0.02806)*this.props.tuningDifficultyModifier)
    let targetFreqRangeUpper = (targetFreq+(targetFreq*0.02973)*this.props.tuningDifficultyModifier)

    this.setState({
      promptedNoteLetter: newNote.noteName,
      // promptedNoteLetter: newNote.noteNameOctave, // @@@@@ DELETE THIS ONCE GRAPHPICS ARE IN! @@@@@
      promptedNoteFreq: newNote.frequency.toFixed(2),
      targetFreqRangeLower: targetFreqRangeLower,
      targetFreqRangeUpper: targetFreqRangeUpper
    });

    this.props.increaseNotesTriedCallback();

    devLogger(`*** NEW NOTE *** `);
    if (lastNote) {devLogger(`lastNote: ${lastNote.noteNameOctave}`);}
    if (newNote) {devLogger(`newNote: ${newNote.noteNameOctave}`);}
  };

  getRandomIntInclusive(min, max) {
      const randInt = Math.floor(Math.random() * (max - min + 1)) + min;
      return randInt;
  }




  // *** GET USER PITCH ***
  getuserPlayingPitch = (pitch) => {
    const oldPitch = this.state.userPlayingPitch;
    // devLogger(`oldPitch: ${oldPitch}, newPitch: ${pitch}`);
    this.checkPitchChange(oldPitch, pitch);
  };


  // *** GAME LOGIC ***
  checkPitchChange(oldPitch, pitch) {
    if (oldPitch !== pitch ){ // pitch has changed, A or B
      this.setState({userPlayingPitch: pitch}, ()=>{devLogger(`pitch changed to: ${pitch}`)});
      this.handlePitchChange(pitch);
      this.findUserNoteByPitch(pitch);
    } else { // pitch has not changed, C
      this.handlePitchNoChange(pitch);
    };
  }

  checkPitchInRange = (pitch) => {
    return (pitch <= this.state.targetFreqRangeUpper && pitch >= this.state.targetFreqRangeLower);
  };

  checkTimerStarted = () => {
    return (this.state.targetTime);
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
          // devLogger('keep playing');
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
          // devLogger('TIMER VOIDED (B1b)');
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
      // devLogger('sparkles in C1');
    } else { // C2
      if (pitch) {
        // devLogger(`Keep going, you're SO CONSISTENT!`);
      }
    }
  };


  // GAME LOGIC HELPERS
  generateSparkles = () => {
    // devLogger('* ... sparkles ... * success');
  };

  handleSuccessfulRound = () => {
    this.props.increaseNotesPlayedCorrectlyCallback();
    this.setNewNote();
    this.voidTargetTime();
    // devLogger(`You got a point! Here's a new note.`);
  }

  checkTargetTimeReached = () => {
    const currentTime = new Date().getTime();
    const targetTime = this.state.targetTime;

    return (currentTime >= targetTime);
  };

  setTargetTime = () => {
    const sustainTimeMilliseconds = 1000;
    const now = new Date().getTime();
    const newTargetTime = now + sustainTimeMilliseconds ;
    this.setState(
      {targetTime: newTargetTime},
      () => {devLogger(`in setTargetTime, now: ${now}, targetTime: ${this.state.targetTime}`);}
    );
  };

  voidTargetTime = () => {
    this.setState({targetTime: null}, () => {devLogger(`in voidTargetTime, targetTime: ${this.state.targetTime}`);});
  }

  // *** FIND NOTE THAT MATCHES USER PITCH ***
  findUserNoteByPitch(pitch) {
    let userNote;
    const availableNotes = this.state.availableNotes;
    const thisPitch = pitch;
    // let i = 0;

    if (!pitch) {this.setState({userPlayingNote: null, noteColorFeedback: "transparent"})};

    for (let i = 0; i < availableNotes.length; i+=1) {
    // while (!userNote) {
      let thisNoteFreqRangeLower = (availableNotes[i].frequency-(availableNotes[i].frequency*0.02806))
      let thisNoteFreqRangeUpper = (availableNotes[i].frequency+(availableNotes[i].frequency*0.02973))
      // devLogger(`%%%% range: ${thisNoteFreqRangeLower} - ${thisNoteFreqRangeUpper}, pitch: ${thisPitch}`)

      if ((thisPitch > thisNoteFreqRangeLower) && (thisPitch < thisNoteFreqRangeUpper)) {
        userNote = availableNotes[i];
      }
      // return null;
      if (userNote) this.setState(
        {userPlayingNote: userNote.noteNameOctave, noteColorFeedback: "orange"},
        devLogger(`userNote: ${userNote.noteNameOctave}`));
      }

      if (!userNote) this.setState({noteColorFeedback: "green"})
      // i += 1;
    };



  // WRAP UP
  componentWillUnmount() { // @@@@@ NEED THIS? @@@@@
    if (this.state.processor){this.state.processor.disconnect()};
  }


  debugHelper = () => {
    this.setNewNote();
  }


  render() {
    let isNoteDetected = this.state.userPlayingNote ? this.state.userPlayingNote : "(no note detected)"
    return(
      <div class="is-paddingless is-marginless">
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
        <p>You are playing:</p>
        <p>{isNoteDetected}</p>

        < Analyzer
          getuserPlayingPitchCallback={this.getuserPlayingPitch}
          />

        < MusicCanvas
          currentUserNote={this.state.userPlayingNote}
          currentPromptedNote={this.state.currentPromptedNote}
          noteColorFeedback={this.state.noteColorFeedback}
          />

          <hr/>

        <div>
          <button className="button" onClick={this.toggleInfoShown}>INFO</button>
          {this.state.infoShown ? <Info toggleInfoShownCallback={this.toggleInfoShown} /> : ''}
        </div>

      </div>
    );
  }
}

Game.propTypes = {
  finishGameCallback: PropTypes.func.isRequired,
  increaseSkippedCountCallback: PropTypes.func.isRequired,
  increaseNotesPlayedCorrectlyCallback: PropTypes.func.isRequired,
  increaseNotesTriedCallback: PropTypes.func.isRequired,
  tuningDifficultyModifier: PropTypes.number.isRequired
};

export default Game;

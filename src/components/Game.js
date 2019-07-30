import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Analyzer from './Analyzer.js';
import MusicCanvas from './MusicCanvas.js'
import { notes } from './NoteDetails.js';
import Info from './Info.js';
import { devLogger } from '../modules/helperFunctions.js';
import '../App.css';

class Game extends Component {
  constructor(props){
    super(props);
    this.state={
      lastPrompedNote: null,
      promptedNote: null, // object
      promptedNoteLetter: null,
      targetFreqRangeLower: null,
      targetFreqRangeUpper: null,
      promptedNoteFreq: 'loading',

      userPlayingPitch: null, //number, Hz
      userPlayingNote: null, // noteNameOctave
      userPlayingNoteObject: null,
      targetTime: null,
      noteColorFeedback: "no note detected",
      noteOpacityFeedback: "0",
      pitchMatchFeedback: "",
      downArrowOpacity: 0,
      upArrowOpacity: 0,

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
      promptedNoteLetterOctave: newNote.noteNameOctave, // @@@@@ DELETE THIS ONCE GRAPHPICS ARE IN? @@@@@
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
      this.pitchMatch();
    } else { // pitch has not changed, C
      this.handlePitchNoChange(pitch);
      this.pitchMatch();
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

    // if (!pitch) this.generateNoUserNoteToDisplay();

    if (pitchInRange) { // A
      if (timerStarted) { // A1
        if (targetTimeReached) { // A1a
          this.generateSuccessDisplay();
        } else { // A1b
          // devLogger('keep playing');
          this.generateKeepPlaying();
        }
      } else { // A2
          this.setTargetTime();
          this.generateKeepPlaying();
      }

    } else { // B note is out of target range ("wrong") or null
      if (timerStarted) { // B1
        this.generateWrongNoteDisplay();
        if (targetTimeReached) { // B1a note changed to null or wrong note, timer has finished
          this.handleSuccessfulRound();
        } else { // B1b
          this.voidTargetTime();
          this.generateWrongNoteDisplay();
          // devLogger('TIMER VOIDED (B1b)');
        }
      } else { // B2
        this.generateWrongNoteDisplay();
        // do nothing
        return;
      }
    }

  };

  handlePitchNoChange(pitch) { // C
    if (!pitch) this.generateNoUserNoteToDisplay();

    if (this.state.targetTime && this.checkTargetTimeReached()) { // C1
      this.generateSuccessDisplay();
      // devLogger('sparkles in C1');
    } else if (this.state.targetTime) { // C2
      this.generateKeepPlaying();
      // devLogger(`Keep going, you're SO CONSISTENT!`);
    } else {
      if (pitch) {

      }
    }
  };


  // GAME LOGIC HELPERS
  generateSuccessDisplay = () => {
    this.setState({noteColorFeedback: "#cc33cc", noteOpacityFeedback: "1"});
    // devLogger('* ... sparkles ... * success');
  };

  generateKeepPlaying = () => {
    this.setState({noteColorFeedback: "#33cc33", noteOpacityFeedback: "1"});
  }

  generateWrongNoteDisplay = () => {
    this.setState({noteColorFeedback: "grey", noteOpacityFeedback: ".6"});
  }

  generateNoUserNoteToDisplay = () => {
    this.setState({noteColorFeedback: "transparent", noteOpacityFeedback: "0"});
  }

  handleSuccessfulRound = () => {
    this.props.increaseNotesPlayedCorrectlyCallback();
    this.setNewNote();
    this.voidTargetTime();
    this.generateNoUserNoteToDisplay();
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
    const thisPitch = pitch; // this could be removed and use pitch below...?
    // let i = 0;

    if (!pitch) {
      this.setState({userPlayingNote: null, userPlayingNoteObject: null},
      // this.generateNoUserNoteToDisplay()
      )};

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
        {userPlayingNote: userNote.noteNameOctave, userPlayingNoteObject: userNote},
        devLogger(`userNote: ${userNote.noteNameOctave}`));
      }

      if (!userNote) {

      }
      // i += 1;
    };



  // WRAP UP
  componentWillUnmount() { // @@@@@ NEED THIS? @@@@@
    if (this.state.processor){this.state.processor.disconnect()};
  }


  debugHelper = () => {
    this.setNewNote();
  }

  pitchMatch = () => {
    // console.log('in pitchMatch');
    if (this.state.userPlayingPitch && this.state.promptedNote){
      if (this.state.userPlayingPitch > this.state.targetFreqRangeUpper) {
        let downArrowOpacity = this.arrowOpacity(this.state.userPlayingPitch, this.state.targetFreqRangeUpper);
        this.setState({downArrowOpacity: downArrowOpacity, upArrowOpacity: 0})
        this.setState({pitchMatchFeedback: "move your fingers down the fingerboard"});
      } else if (this.state.userPlayingPitch < this.state.targetFreqRangeLower) {
        let upArrowOpacity = this.arrowOpacity(this.state.userPlayingPitch, this.state.targetFreqRangeLower);
        this.setState({upArrowOpacity: upArrowOpacity, downArrowOpacity: 0})
        this.setState({pitchMatchFeedback: "move you fingers up the fingerboard"});
      } else if (this.state.userPlayingPitch < this.state.targetFreqRangeUpper && this.state.userPlayingPitch > this.state.targetFreqRangeLower) {
        this.setState({downArrowOpacity: 0, upArrowOpacity: 0})
        this.setState({pitchMatchFeedback: "you got it!"});
      }
    }
    if (this.state.userPlayingNoteObject && this.state.promptedNote) {
      if (this.state.userPlayingNoteObject.string !== this.state.promptedNote.string) {
        // console.log(`prompted string: ${this.state.promptedNote.string}, user string: ${this.state.userPlayingNoteObject.string}`);
        this.setState({pitchMatchFeedback: "try another string"});

      }
    } else if (!this.state.userPlayingPitch) {
      this.setState({downArrowOpacity: 0, upArrowOpacity: 0});
      this.setState({pitchMatchFeedback: ""})
    }
  }

  arrowOpacity = (userPlayingPitch, freqBoundary) => {
    let opacity = Math.abs(userPlayingPitch - freqBoundary)/freqBoundary;
    opacity = 28 * opacity <= 1 ? 28 * opacity : 1;
    return opacity;
  }

  render() {
    let isNoteDetected = this.state.userPlayingNote ? this.state.userPlayingNote : "(listening...)";
    let youArePlayingClass = isNoteDetected!=="(listening...)" ? "test tag is-primary is-medium" : "";
    let youArePlayingId = isNoteDetected!=="(listening...)" ? "test" : "";
    // console.log('is note detected: ', isNoteDetected);



    return(
      <div >


        <div className="music-canvas">
          < MusicCanvas
            currentUserNote={this.state.userPlayingNoteObject}
            currentPromptedNote={this.state.promptedNote}
            noteColorFeedback={this.state.noteColorFeedback}
            noteOpacityFeedback={this.state.noteOpacityFeedback}
            upArrowOpacity={this.state.upArrowOpacity}
            downArrowOpacity={this.state.downArrowOpacity}
            />
        </div>

        <section>
          <p>{this.state.pitchMatchFeedback}</p>

          <div  className="fixed-height-div">
            <p>You are playing:</p>
            <p id={youArePlayingId} className={youArePlayingClass}> {isNoteDetected} </p>
          </div>

        </section>

        < Analyzer
          getuserPlayingPitchCallback={this.getuserPlayingPitch}
        />


        <div className="buttons mt-1">
          <button className="button is-medium" onClick={this.giveHint}>hint</button>
          <button className="button is-medium" onClick={this.skipNote}>skip</button>
          <button className="button is-medium" onClick={this.props.finishGameCallback}>finished</button>
          <button className="button is-medium" onClick={this.toggleInfoShown}>info</button>
          {this.state.infoShown ? <Info toggleInfoShownCallback={this.toggleInfoShown} /> : ''}
        </div>

      </div>
    );
  }
}

// <p>Play: {this.state.promptedNoteLetter} {this.state.promptedNoteFreq} Hz</p>
// <button className="button is-small" onClick={this.debugHelper}>debugHelper action</button>
Game.propTypes = {
  finishGameCallback: PropTypes.func.isRequired,
  increaseSkippedCountCallback: PropTypes.func.isRequired,
  increaseNotesPlayedCorrectlyCallback: PropTypes.func.isRequired,
  increaseNotesTriedCallback: PropTypes.func.isRequired,
  tuningDifficultyModifier: PropTypes.number.isRequired
};

export default Game;

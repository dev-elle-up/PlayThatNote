import React, { Component } from 'react';

class Game extends Component {
  constructor(props){
    super(props);
    this.state={
      // userAudioFromMic: null,
      // last_propmted_note: null,
      // current_prompted_note: null,
      // current_user_note: null,
      // note_matched: false
    }

  }

  // functions go here
  getMicrophoneFeed(){ // need keyword async at start of this line?
    const userAudioFromMic = navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    this.setState({userAudioFromMic})
    console.log('in getMicrophoneFeed, userAudioFromMic: ', this.state.userAudioFromMic); // audio is now MediaStream
  }




  render() {
    return(
      <section>
        <p> This is where the game goes!</p>
        <button onClick={this.giveHint}>hint</button>
        <button onClick={this.skipNote}>skip</button>
        <button onClick={this.props.finishGameCallback}>finished</button>
      </section>
    );
  }
}

export default Game;

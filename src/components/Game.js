import React, { Component } from 'react';

class Game extends Component {
  constructor(props){
    super(props);
    this.state={
      userAudioFromMic: null,
      // last_propmted_note: null,
      // current_prompted_note: null,
      // current_user_note: null,
      // note_matched: false
    }

  }

  // functions go here

  async getMicrophoneFeed() { // need keyword async at start of this line?
    const userAudioFromMic = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    this.setState({userAudioFromMic})
    console.log('in getMicrophoneFeed, userAudioFromMic: ', this.state.userAudioFromMic);
    return {userAudioFromMic}
     // audio is now MediaStream
  }

  componentDidMount(){
    this.getMicrophoneFeed();
    console.log('in componentDidMount, userAudioFromMic: ', this.state.userAudioFromMic);
  }




  showMeTheState = () => {
    console.log('in showMeTheState, userAudioFromMic: ', this.state.userAudioFromMic);
  }

  componentWillUnmount() {
    this.setState({userAudioFromMic: null})
  }


  render() {
    console.log('in render, userAudioFromMic: ', this.state.userAudioFromMic);
    return(
      <section>
        <p> This is where the game goes!</p>
        <button onClick={this.giveHint}>hint</button>
        <button onClick={this.skipNote}>skip</button>
        <button onClick={this.props.finishGameCallback}>finished</button>
        <button onClick={this.showMeTheState}>show me the state</button>
      </section>
    );
  }
}

export default Game;

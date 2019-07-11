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

  componentDidMount(){
    this.getMicrophoneFeed();
  }

  componentWillUnmount() {
    this.setState({userAudioFromMic: null})
  }

  async getMicrophoneFeed() {
    const userAudioFromMic = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    this.setState({userAudioFromMic})
     // userAudioFromMic is now accessible in state as MediaStream
  }


  showMeTheState = () => {
    console.log('in showMeTheState, userAudioFromMic: ', this.state.userAudioFromMic);
  }

  render() {

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

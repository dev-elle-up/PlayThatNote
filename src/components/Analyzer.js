import React, { Component } from 'react';
// import a component if you want to return it in your render
import Pitchfinder from 'pitchfinder';

class Analyzer extends Component {

  detectPitch = Pitchfinder.YIN();

  // myAudioBuffer = this.props.userAudioFromMic.getAudioBuffer(); // assume this returns a WebAudio AudioBuffer object
  // float32Array = this.myAudioBuffer.getChannelData(0); // get a single channel of sound
  // pitch = this.detectPitch(float32Array); // null if pitch cannot be identified

// take mic input and .connect to audioBuffer?

  render(){
    return(<div></div>);
  }

}

export default Analyzer;



// const Pitchfinder = require("pitchfinder");
// const detectPitch = Pitchfinder.AMDF();
//
// const myAudioBuffer = getAudioBuffer(); // assume this returns a WebAudio AudioBuffer object
// const float32Array = myAudioBuffer.getChannelData(0); // get a single channel of sound
// const pitch = detectPitch(float32Array); // null if pitch cannot be identified

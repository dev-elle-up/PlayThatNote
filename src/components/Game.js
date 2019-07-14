import React, { Component } from 'react';
import Analyzer from './Analyzer.js';
import Pitchfinder from 'pitchfinder';

class Game extends Component {
  constructor(props){
    super(props);
    this.state={
      userAudioFromMic: null,
      processor: null,
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
    if (this.state.processor){this.state.processor.disconnect()}; // without this, error: Cannot read property 'disconnect' of null
  }

  async getMicrophoneFeed() {
    const userAudioFromMic = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    this.setState({userAudioFromMic})
     // userAudioFromMic is now accessible in state as MediaStream

     const devices = navigator.mediaDevices.enumerateDevices();
     console.log('devices', devices);
  }


  showMeTheState = () => {
    // console.log('in showMeTheState, userAudioFromMic: ', this.state.userAudioFromMic);
    // console.log('in showMeTheState, userAudioFromMic type: ', typeof this.state.userAudioFromMic);

    // const numOfMics = this.state.userAudioFromMic.mediaStream.getAudioTracks();
    // console.log('numOfMics: ', numOfMics);

    // TEST
    // const audioTracks = this.state.userAudioFromMic.getAudioTracks();
    // console.log('audioTracks: ', audioTracks);

    const context = new AudioContext();
    const source = context.createMediaStreamSource(this.state.userAudioFromMic);
    const processor = context.createScriptProcessor(4096, 1, 1);
    //Creates a ScriptProcessorNode for direct audio processing.
    // Arguments: bufferSize, numberOfInputChannels, numberOfOutputChannels
    // bufferSize: no. of units of sample-frames; values must be: 256, 512, 1024, 2048, 4096, 8192, or 16384. This value controls how frequently the onaudioprocess event handler is called and how many sample-frames need to be processed each call.
    this.setState({processor: processor}); // the ScriptProcessorNode is now available in state as processor
    source.connect(processor); // route the output of the source to the input of the processor; userAudioFromMic -->> ScriptProcessorNode
    processor.connect(context.destination); // routes the output of the processor node to the destination node; required
    // console.log('processor', processor);
    const detectPitch = Pitchfinder.AMDF();
    // console.log('Pitchfinder.AMDF', Pitchfinder.AMDF);


    processor.onaudioprocess = function(audioBuffer) {
      // console.log(audioBuffer);
      // const float32Array = audioBuffer.getChannelData(0);
      const pitch = detectPitch(audioBuffer.inputBuffer.getChannelData(0));
      // get a single channel of sound from the AudioBuffer object
      // const pitch = detectPitch(float32Array);
      // null if pitch cannot be identified
      console.log('pitch: ', pitch);
      // each time the buffer is added to, the pitch is detected from the input
    }
  }


  render() {

    return(
      <section>
        <p> This is where the game goes!</p>
        <button onClick={this.giveHint}>hint</button>
        <button onClick={this.skipNote}>skip</button>
        <button onClick={this.props.finishGameCallback}>finished</button>
        <button onClick={this.showMeTheState}>show me the state</button>
        <Analyzer
        mediaStream={this.state.userAudioFromMic}/>
      </section>
    );
  }
}

export default Game;

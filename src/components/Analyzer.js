import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pitchfinder from 'pitchfinder';
// import a component if you want to return it in your render

class Analyzer extends Component {
  constructor(){
    super();
    this.state={
      processor: null,
      pitch: null,
    }
  }

  componentDidMount(){
    // Pitchfinder.module.exports.config.minFrequency = 60;
    // console.log(Pitchfinder.AMDF);
    this.runAnalyzer();
  }

  componentWillUnmount() {
    if (this.state.processor){this.state.processor.disconnect()};
  }

  async runAnalyzer() {
    const userAudioFromMic = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    // userAudioFromMic is accessible as a MediaStream

     const context = new AudioContext();
     const source = context.createMediaStreamSource(userAudioFromMic);
     const processor = context.createScriptProcessor(4096, 1, 1);
     //Creates a ScriptProcessorNode for direct audio processing.
     // Arguments: bufferSize (bytes), numberOfInputChannels, numberOfOutputChannels
     // bufferSize: no. of units of sample-frames; values must be: 256, 512, 1024, 2048, 4096, 8192, or 16384. This value controls how frequently the onaudioprocess event handler is called and how many sample-frames need to be processed each call.
     this.setState({ processor }); // the ScriptProcessorNode is now available in state as processor
     source.connect(processor); // route the output of the source to the input of the processor; userAudioFromMic -->> ScriptProcessorNode
     processor.connect(context.destination); // routes the output of the processor node to the destination node; required
     // console.log('processor', processor);
     const detectPitch = Pitchfinder.AMDF({minFrequency: 60});
     // console.log('Pitchfinder.AMDF', Pitchfinder.AMDF);


     processor.onaudioprocess = function(audioBuffer) {
       const pitch = detectPitch(audioBuffer.inputBuffer.getChannelData(0));
       // get a single channel of sound from the AudioBuffer object
       // const pitch = detectPitch(float32Array);
       // each time the buffer is added to, the pitch is detected from the input
       // null if pitch cannot be identified
       const oldPitch = this.state.pitch;

       if (oldPitch !== pitch ){
         this.setState({ pitch },()=>{
           this.props.getuserPlayingPitchCallback(pitch)
         });
       }

       // console.log('pitch: ', pitch);
      }.bind(this)

  }

  render(){
    if (this.state.pitch) {
      return( <div className="tag is-primary is-medium">{this.state.pitch} Hz</div> );
    }

    return(<div className="tag is-warning is-medium">No pitch detected</div>)
  }

}

Analyzer.propTypes = {
  getuserPlayingPitchCallback: PropTypes.func.isRequired
}

export default Analyzer;

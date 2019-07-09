const Pitchfinder = require("pitchfinder");
const detectPitch = Pitchfinder.AMDF();

const myAudioBuffer = getAudioBuffer(); // assume this returns a WebAudio AudioBuffer object
const float32Array = myAudioBuffer.getChannelData(0); // get a single channel of sound
const pitch = detectPitch(float32Array); // null if pitch cannot be identified

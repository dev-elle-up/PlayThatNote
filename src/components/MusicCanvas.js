import React from 'react';
import PropTypes from 'prop-types';
import { devLogger } from '../modules/helperFunctions.js';

import { ReactComponent as TestBassClef} from '../images/testBassClef.svg'
// import { ReactComponent as FClef } from '../images/FClef.svg';

function MusicCanvas(props) {

  const svgWidth = 8268;//  window.innerWidth * widthScale;
  const svgHeight = 11692;// window.innerHeight * heightScale;

  // const widthScale =  window.innerWidth / svgWidth;
  // const heightScale = window.innerHeight / svgHeight;

  return (

          <svg
             xmlSpace="preserve"
             width={svgWidth}
             height={svgHeight}


             id="bassClef"

             xmlnsXlink="http://www.w3.org/1999/xlink">

             < TestBassClef />


          </svg>

             // viewBox={`0 0 ${window.innerWidth/2} ${window.innerHeight/2}`}

      // if (this.props.noteColorFeedback==='green') {
      //   return( <div className="tag is-primary is-medium">{this.state.pitch} Hz</div> )

        )

      };

      // < Note noteName={props.userPlayingNote} style="" noteColorFeedback="" height=""/>
      // < Note noteName={props.currentPromptedNote} style="prompted" height=""/>
            // < TestBassClef />

MusicCanvas.propTypes = {




  }

export default MusicCanvas;
// <img src={FClef} alt='different bass clef'></img>

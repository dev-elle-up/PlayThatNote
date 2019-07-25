import React from 'react';
import PropTypes from 'prop-types';
import { devLogger } from '../modules/helperFunctions.js';

// import { ReactComponent as TestBassClef} from '../images/testBassClef.svg'
// import { ReactComponent as FClef } from '../images/FClef.svg';

function MusicCanvas(props) {

  // const widthToHeightRatio = 155/94;
  const svgWidth = 390;//  window.innerWidth * widthScale;
  const svgHeight = 94;// window.innerHeight * heightScale;

  const containerWidth = window.innerWidth  * 0.6;
  // console.log('MusicCanvas, window.innerWidth: ', window.innerWidth);
  const scale = (containerWidth / svgWidth)* 0.6  ;
  const noteToY_coord = {

  }

  // const widthScale =  window.innerWidth / svgWidth;
  // const heightScale = window.innerHeight / svgHeight;

  return (
    <div class="is-paddingless is-marginless">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink">
        xmlSpace="preserve"

        width={scale * svgWidth +'pt'}
        height={scale * svgHeight +'pt'}
        id="bassClefAndStaff"

        <g transform={"scale(" + scale + ")"}>


         <rect width={svgWidth +'pt'} height={svgHeight +'pt'} fill="pink" stroke="green"/>

         <g id="g846" transform="translate(-79.55817,-327.4330)">
            <path d="M 89,344.81976 L 89.253147,433.88354" id="staff-line-left-vertical" fill="green" fill-opacity="0.75000000"   stroke="black" stroke-width="3.0000000pt" />
            <path d="M 89,345.53484 L 400,346.25462" id="staff-line-5" fill="black" fill-opacity="0.75000000"   stroke="red" stroke-width="1.4pt" />
            <path d="M 89,367.48822 L 400,368.20800" id="staff-line-4" fill="black" fill-opacity="0.75000000"   stroke="blue" stroke-width="1.4pt" />
            <path d="M 89,389.26167 L 400,389.98145" id="staff-line-3" fill="black" fill-opacity="0.75000000"  stroke="black" stroke-width="1.4pt" />
            <path d="M 89,411.48499 L 400,412.20477" id="staff-line-2" fill="black" fill-opacity="0.75000000"   stroke="black" stroke-width="1.4pt" />
            <path d="M 89,433.25844 L 400,433.97822" id="staff-line-1" fill="black" fill-opacity="0.75000000"   stroke="black" stroke-width="1.4pt" />
          </g>

          <g id="bassClefAndDots" transform="translate(-74.81768,-328.2816)">
            <g id="cleffDots" transform="translate(12.21513,0.000000)">
              <path d="M 344.56847 325.81644 A 4.3261919 4.3261919 0 1 0 335.91609,325.81644 A 4.3261919 4.3261919 0 1 0 344.56847 325.81644 z" id="path855"  fill="black" fill-opacity="1"   stroke="hotpink" stroke-width="1.0000000pt" transform="translate(-188.3166,32.06472)"/>
              <path d="M 344.56847 325.81644 A 4.3261919 4.3261919 0 1 0 335.91609,325.81644 A 4.3261919 4.3261919 0 1 0 344.56847 325.81644 z" id="path857"  fill="black" fill-opacity="1"   stroke="orange" stroke-width="1.0000000pt" transform="translate(-189.3345,53.44120)"/>
            </g>
            <g id="bassClef">
              <path d="M 118.07959 368.82385 A 8.6523838 8.6523838 0 1 0 100.77482,368.82385 A 8.6523838 8.6523838 0 1 0 118.07959 368.82385 z" id="clefTipHighlight"  fill="orange" fill-opacity="1"   stroke="black" stroke-width="1.0000000pt" transform="matrix(1.397740,0.000000,0.000000,1.397740,-44.92324,-146.3143)"/>
              <path d="M 95.859988,371.63448 C 90.264914,352.12932 103.76008,339.25423 121.54860,338.83318 C 139.59160,338.41213 151.02486,354.43377 151.40900,369.22065 C 152.04763,384.00753 145.38520,396.15050 131.91497,410.73661 C 120.87703,422.89747 99.665017,432.61417 98.088584,431.20186 C 96.332204,429.78955 114.29957,421.85513 125.47619,409.09796 C 132.40912,401.00465 139.51693,383.91281 138.91821,371.26710 C 137.87516,354.61161 124.48340,345.01552 119.25108,344.06033 C 115.79939,343.34942 112.38667,344.18009 109.07043,345.73636 C 106.34185,347.07037 104.63525,349.73327 104.56631,351.19160 C 104.40330,354.38523 108.47495,356.28672 110.68634,356.95999 C 118.94456,359.45486 107.09689,380.69396 95.859988,371.63448 z " id="mainBassClef"  fill="white"   stroke="#000000" stroke-opacity="1.0000000" stroke-width="1pt"  fill-opacity="1.0000000"/>
            </g>
          </g>
        </g>
      </svg>
    </div>

             // < TestBassClef />

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

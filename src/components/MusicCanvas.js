import React from 'react';
import PropTypes from 'prop-types';
import { devLogger } from '../modules/helperFunctions.js';

// import { ReactComponent as TestBassClef} from '../images/testBassClef.svg'
// import { ReactComponent as FClef } from '../images/FClef.svg';

function MusicCanvas(props) {

  // const widthToHeightRatio = 155/94;
  const svgWidth = 390;//  window.innerWidth * widthScale;
  const svgHeight = 94;// window.innerHeight * heightScale;

  // const containerWidth = window.innerWidth  * 0.6;
  // console.log('MusicCanvas, window.innerWidth: ', window.innerWidth);
  const scale = 1 //(containerWidth / svgWidth)* 0.6  ;
  // const noteToY_coord = {

  // }
  let color = props.noteColorFeedback;

  // const widthScale =  window.innerWidth / svgWidth;
  // const heightScale = window.innerHeight / svgHeight;

  return (
    <div >
      <svg
        version="1.1"
        baseProfile="full"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"

        id="bassClefAndStaff"
        // overflow="visible"

        viewBox="0,0,316,180"
        >

       <rect width="100%" height="100%" fill="#fbcdcd" fill-opacity=".5" stroke="green"/>

       <g id="staff" transform="">
          <path d="M 10,15 V 95" id="staff-line-left-vertical" fill="green" fill-opacity="0.75000000"   stroke="black" stroke-width="3.0000000pt" />
          <path d="M 285,15 V 95" id="staff-line-left-vertical" fill="green" fill-opacity="0.75000000"   stroke="black" stroke-width="3.0000000pt" />
          <path d="M 302,14 V 96" id="staff-line-left-vertical" fill="green" fill-opacity="0.75000000"   stroke="black" stroke-width="8.0000000pt" />
          <path d="M 8,15 H 300" id="staff-line-5" fill="black" fill-opacity="0.75000000"   stroke="black" stroke-width="1.4pt" />
          <path d="M 8,35 H 300" id="staff-line-4" fill="black" fill-opacity="0.75000000"   stroke="black" stroke-width="1.4pt" />
          <path d="M 8,55 H 300" id="staff-line-3" fill="black" fill-opacity="0.75000000"  stroke="black" stroke-width="1.4pt" />
          <path d="M 8,75 H 300" id="staff-line-2" fill="black" fill-opacity="0.75000000"   stroke="black" stroke-width="1.4pt" />
          <path d="M 8,95 H 300" id="staff-line-1" fill="black" fill-opacity="0.75000000"   stroke="black" stroke-width="1.4pt" />
        </g>

        <g id="bass-clef-and-dots" transform="scale(.65) translate(-50,-315)">
          <g id="cleffDots" transform="translate(12.21513,0.000000)">
            <path d="M 344.56847 325.81644 A 4.3261919 4.3261919 0 1 0 335.91609,325.81644 A 4.3261919 4.3261919 0 1 0 344.56847 325.81644 z" id="path855"  fill="#336699" fill-opacity="1"   stroke="black" stroke-width="1.0000000pt" transform="translate(-188.5,32.06472)"/>
            <path d="M 344.56847 325.81644 A 4.3261919 4.3261919 0 1 0 335.91609,325.81644 A 4.3261919 4.3261919 0 1 0 344.56847 325.81644 z" id="path857"  fill="#336699" fill-opacity="1"   stroke="black" stroke-width="1.0000000pt" transform="translate(-188.5,53.44120)"/>
          </g>
          <g id="bass-clef">
            <path d="M 118.07959 368.82385 A 8.6523838 8.6523838 0 1 0 100.77482,368.82385 A 8.6523838 8.6523838 0 1 0 118.07959 368.82385 z" id="clefTipHighlight"  fill="pink" fill-opacity="1"   stroke="black" stroke-width="1.0000000pt" transform="matrix(1.397740,0.000000,0.000000,1.397740,-44.92324,-146.3143)"/>
            <path d="M 95.859988,371.63448 C 90.264914,352.12932 103.76008,339.25423 121.54860,338.83318 C 139.59160,338.41213 151.02486,354.43377 151.40900,369.22065 C 152.04763,384.00753 145.38520,396.15050 131.91497,410.73661 C 120.87703,422.89747 99.665017,432.61417 98.088584,431.20186 C 96.332204,429.78955 114.29957,421.85513 125.47619,409.09796 C 132.40912,401.00465 139.51693,383.91281 138.91821,371.26710 C 137.87516,354.61161 124.48340,345.01552 119.25108,344.06033 C 115.79939,343.34942 112.38667,344.18009 109.07043,345.73636 C 106.34185,347.07037 104.63525,349.73327 104.56631,351.19160 C 104.40330,354.38523 108.47495,356.28672 110.68634,356.95999 C 118.94456,359.45486 107.09689,380.69396 95.859988,371.63448 z " id="mainBassClef"  fill="#336699"   stroke="#000000" stroke-opacity="1.0000000" stroke-width="1pt"  fill-opacity="1.0000000"/>
          </g>
        </g>



        <g transform="scale (.05) translate(3000,-200)" id="whole-note">

          <path d="m 339.0261373780306,493.8976702587238 c 166.2765435386572,1.4979868787024 323.5651658049512,64.4134357852374 335.5490608347653,203.7262155068141 C 683.5631194851495,799.5338056089083 548.7443003997542,892.3621799999998 382.4677568611023,892.3621799999998 214.6932264437185,890.8641931212504 58.90259105614777,829.4467310934851 45.42070914760757,690.1807634618676 36.43278787524887,586.7260446498161 172.6559696594483,493.8976702587239 339.0261373780274,493.8976702587239 z m 40.3520215456972,364.0108115305648 c 71.9033701788793,0 118.3409634194051,-68.9542085113809 110.851029025773,-124.3329109343109 -16.4778556659969,-109.3530421470458 -53.9275276341617,-197.7810800818661 -152.7946616301204,-197.7810800818661 -71.9033701788806,0 -113.8470027832237,70.4053833001443 -104.8590815108626,125.8308978130285 16.5714798459128,109.399854237005 48.0292042991697,196.2830932031485 146.8027141152068,196.2830932031485 z"
          id="path270" fill={color} />
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

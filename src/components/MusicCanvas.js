import React from 'react';
import PropTypes from 'prop-types';
import { devLogger } from '../modules/helperFunctions.js';

// import { ReactComponent as TestBassClef} from '../images/testBassClef.svg'
// import { ReactComponent as FClef } from '../images/FClef.svg';

function MusicCanvas(props) {

  // const widthToHeightRatio = 155/94;
  // const svgWidth = 390;//  window.innerWidth * widthScale;
  // const svgHeight = 94;// window.innerHeight * heightScale;

  // const containerWidth = window.innerWidth  * 0.6;
  // console.log('MusicCanvas, window.innerWidth: ', window.innerWidth);
  // const scale = 1 //(containerWidth / svgWidth)* 0.6  ;
  // const noteToY_coord = {

  // }

  // const widthScale =  window.innerWidth / svgWidth;
  // const heightScale = window.innerHeight / svgHeight;

  let userNoteColor = props.noteColorFeedback;
  let userNoteOpacity = props.noteOpacityFeedback;

let testValue = "67,13"
  return (
    <div >
      <svg
        version="1.1"
        baseProfile="full"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"

        id="bassClefAndStaff"
        // overflow="visible"

        viewBox="0,0,300,160"
        >

      <rect width="100%" height="100%" fill="#EDC" fillOpacity="0" strokeOpacity="0" stroke="green"/>

       <g id="staff" transform="">
          <path d="M 1.5,45 v 60" id="staff-line-left-vertical" fill="green" fillOpacity="0.75"   stroke="black" strokeWidth="3pt" />
          <path d="M 278,45 v 60" id="staff-line-right-vertical-1" fill="green" fillOpacity="0.75"   stroke="black" strokeWidth="3pt" />
          <path d="M 295,45 v 60" id="staff-line-right-vertical-2" fill="green" fillOpacity="0.75"   stroke="black" strokeWidth="8pt" />

          <path d="M 0,15 H 300" id="staff-line-7-E" stroke="orange" strokeWidth="1.4pt" strokeOpacity="0.35" />
          <path d="M 0,30 H 300" id="staff-line-6-C" stroke="orange" strokeWidth="1.4pt" strokeOpacity="0.35" />
          <path d="M 0,45 H 300" id="staff-line-5-A" stroke="black" strokeWidth="1.4pt" />
          <path d="M 0,60 H 300" id="staff-line-4-F" stroke="black" strokeWidth="1.4pt" />
          <path d="M 0,75 H 300" id="staff-line-3-D" stroke="black" strokeWidth="1.4pt" />
          <path d="M 0,90 H 300" id="staff-line-2-B" stroke="black" strokeWidth="1.4pt" />
          <path d="M 0,105 H 300" id="staff-line-1-G" stroke="black" strokeWidth="1.4pt" />
          <path d="M 0,120 H 300" id="staff-line--1-E" stroke="orange" strokeWidth="1.4pt" strokeOpacity="0.35" />
          <path d="M 0,135 H 300" id="staff-line--2-C" stroke="orange" strokeWidth="1.4pt" strokeOpacity="0.35" />
        </g>

        <g id="bass-clef-and-dots" transform="scale(.65) translate(-65,-275)">
          <g id="cleffDots" transform="translate(12.21513,0)">
            <path d="M 344.56847 325.81644 A 4.3261919 4.3261919 0 1 0 335.91609,325.81644 A 4.3261919 4.3261919 0 1 0 344.56847 325.81644 z" id="path855"  fill="#336699" fillOpacity="1"   stroke="black" strokeWidth="1pt" transform="translate(-188.5,32.06472)"/>
            <path d="M 344.56847 325.81644 A 4.3261919 4.3261919 0 1 0 335.91609,325.81644 A 4.3261919 4.3261919 0 1 0 344.56847 325.81644 z" id="path857"  fill="#336699" fillOpacity="1"   stroke="black" strokeWidth="1pt" transform="translate(-188.5,53.44120)"/>
          </g>
          <g id="bass-clef">
            <path d="M 118.07959 368.82385 A 8.6523838 8.6523838 0 1 0 100.77482,368.82385 A 8.6523838 8.6523838 0 1 0 118.07959 368.82385 z" id="clefTipHighlight"  fill="#EDC" fillOpacity="1"   stroke="black" strokeWidth="1pt" transform="matrix(1.397740,0.000000,0.000000,1.397740,-44.92324,-146.3143)"/>
            <path d="M 95.859988,371.63448 C 90.264914,352.12932 103.76008,339.25423 121.54860,338.83318 C 139.59160,338.41213 151.02486,354.43377 151.40900,369.22065 C 152.04763,384.00753 145.38520,396.15050 131.91497,410.73661 C 120.87703,422.89747 99.665017,432.61417 98.088584,431.20186 C 96.332204,429.78955 114.29957,421.85513 125.47619,409.09796 C 132.40912,401.00465 139.51693,383.91281 138.91821,371.26710 C 137.87516,354.61161 124.48340,345.01552 119.25108,344.06033 C 115.79939,343.34942 112.38667,344.18009 109.07043,345.73636 C 106.34185,347.07037 104.63525,349.73327 104.56631,351.19160 C 104.40330,354.38523 108.47495,356.28672 110.68634,356.95999 C 118.94456,359.45486 107.09689,380.69396 95.859988,371.63448 z " id="mainBassClef"  fill="#336699"   stroke="#000000" strokeOpacity="1" strokeWidth="1pt"  fillOpacity="1"/>
          </g>
        </g>



       <g transform="scale(2.5)" id="prompted-note">
        <path fill="#000000" id="path2918" d={`m${testValue}c -1.86907,-0.09088 -3.32965,-1.61499 -3.91571,-3.19104c-0.35509,-0.92505 -0.16006,-2.31274 1.02287,-2.57263c1.71386,-0.2674 3.13601,1.07001 3.93307,2.34991c0.5678,0.94922 0.8817,2.44415 -0.18289,3.19659c-0.25277,0.15576 -0.55835,0.2182 -0.85734,0.21716zm2.9775,-5.40332c-2.10578,-1.17487 -4.76581,-1.26642 -7.07169,-0.60889c-1.46067,0.46912 -3.13119,1.4671 -3.14501,3.09137c-0.00101,1.59149 1.61108,2.58429 3.03763,3.05713c2.25844,0.67865 4.86424,0.61896 6.97286,-0.46289c1.19358,-0.58337 2.25152,-1.79138 1.89277,-3.13031c-0.19726,-0.86096 -0.91521,-1.50519 -1.68655,-1.94641z`}/>
       </g>




        <g transform="scale (.05) translate(3000,-190)" id="user-note">

          <path d="m 339.0261373780306,493.8976702587238 c 166.2765435386572,1.4979868787024 323.5651658049512,64.4134357852374 335.5490608347653,203.7262155068141 C 683.5631194851495,799.5338056089083 548.7443003997542,892.3621799999998 382.4677568611023,892.3621799999998 214.6932264437185,890.8641931212504 58.90259105614777,829.4467310934851 45.42070914760757,690.1807634618676 36.43278787524887,586.7260446498161 172.6559696594483,493.8976702587239 339.0261373780274,493.8976702587239 z m 40.3520215456972,364.0108115305648 c 71.9033701788793,0 118.3409634194051,-68.9542085113809 110.851029025773,-124.3329109343109 -16.4778556659969,-109.3530421470458 -53.9275276341617,-197.7810800818661 -152.7946616301204,-197.7810800818661 -71.9033701788806,0 -113.8470027832237,70.4053833001443 -104.8590815108626,125.8308978130285 16.5714798459128,109.399854237005 48.0292042991697,196.2830932031485 146.8027141152068,196.2830932031485 z"
          id="path270" className="user-playing-note" fill={userNoteColor} fillOpacity={userNoteOpacity}/>
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
      // < Note noteName={props.currentPromptedNote.noteNameOctave} style="prompted" height=""/>
            // < TestBassClef />

MusicCanvas.propTypes = {
  currentUserNote: PropTypes.string,
  currentPromptedNote: PropTypes.string,
  noteColorFeedback: PropTypes.string



  }

export default MusicCanvas;
// <img src={FClef} alt='different bass clef'></img>

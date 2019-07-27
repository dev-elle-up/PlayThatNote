import React from 'react';
import PropTypes from 'prop-types';
// import bassClefPianokeyToYcoord from './NoteDetails.js'
import { devLogger } from '../modules/helperFunctions.js';

// import { ReactComponent as TestBassClef} from '../images/testBassClef.svg'
// import { ReactComponent as FClef } from '../images/FClef.svg';
const bassClefPianokeyToYcoord = {
  42: 22.5,
  41: 30,
  40: 30,
  39: 37.5
}

function MusicCanvas(props) {

const scaleForWholeNoteSvg = 2.3;
const noteHeightForWholeNoteSvg = 7;

const getNoteYfromCanvasY = (svgY, scale, noteHeight) => {
  // console.log('svgY: ',svgY, " type: ",typeof svgY);
  return svgY/scale + noteHeight/2;
}


let userNoteColor = props.noteColorFeedback;
let userNoteOpacity = props.noteOpacityFeedback;

let heightOnStaffUser = -10;
let heightOnStaffPrompted = -10;


if (props.currentUserNote) {
  heightOnStaffUser = getNoteYfromCanvasY(
    bassClefPianokeyToYcoord[props.currentUserNote.noteNum],
    scaleForWholeNoteSvg,
    noteHeightForWholeNoteSvg);

      console.log('heightOnStaffUser:...........', heightOnStaffUser);
}

if (props.currentPromptedNote) {
  heightOnStaffPrompted = getNoteYfromCanvasY(
    bassClefPianokeyToYcoord[props.currentPromptedNote.noteNum],
    scaleForWholeNoteSvg,
    noteHeightForWholeNoteSvg
  )
}



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

      <rect width="100%" height="100%" fill="#EDC" fillOpacity="0" strokeOpacity="0.0" stroke="green"/>

       <g id="staff" transform="">
          <path d="M 1.5,45 v 60" id="staff-line-left-vertical" stroke="black" strokeWidth="3pt" />
          <path d="M 278,45 v 60" id="staff-line-right-vertical-1" stroke="black" strokeWidth="3pt" />
          <path d="M 295,45 v 60" id="staff-line-right-vertical-2" stroke="black" strokeWidth="8pt" />

          <path d="M 130,15 h 40" id="staff-line-7-E" stroke="orange" strokeWidth="1.4pt" strokeOpacity="0.35" />
          <path d="M 130,30 h 40" id="staff-line-6-C" stroke="orange" strokeWidth="1.4pt" strokeOpacity="0.35" />
          <path d="M 0,45 H 300" id="staff-line-5-A" stroke="black" strokeWidth="1.4pt" />
          <path d="M 0,60 H 300" id="staff-line-4-F" stroke="black" strokeWidth="1.4pt" />
          <path d="M 0,75 H 300" id="staff-line-3-D" stroke="black" strokeWidth="1.4pt" />
          <path d="M 0,90 H 300" id="staff-line-2-B" stroke="black" strokeWidth="1.4pt" />
          <path d="M 0,105 H 300" id="staff-line-1-G" stroke="black" strokeWidth="1.4pt" />
          <path d="M 130,120 h 40" id="staff-line--1-E" stroke="orange" strokeWidth="1.4pt" strokeOpacity="0.35" />
          <path d="M 130,135 h 40" id="staff-line--2-C" stroke="orange" strokeWidth="1.4pt" strokeOpacity="0.35" />
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

       <g transform={`scale(${scaleForWholeNoteSvg})`} id="prompted-note">
        <path fill="#000000" stroke="black" strokeWidth="0.5pt"
        d={`m 66.4,${heightOnStaffPrompted}c -1.86907,-0.09088 -3.32965,-1.61499 -3.91571,-3.19104c-0.35509,-0.92505 -0.16006,-2.31274 1.02287,-2.57263c1.71386,-0.2674 3.13601,1.07001 3.93307,2.34991c0.5678,0.94922 0.8817,2.44415 -0.18289,3.19659c-0.25277,0.15576 -0.55835,0.2182 -0.85734,0.21716zm2.9775,-5.40332c-2.10578,-1.17487 -4.76581,-1.26642 -7.07169,-0.60889c-1.46067,0.46912 -3.13119,1.4671 -3.14501,3.09137c-0.00101,1.59149 1.61108,2.58429 3.03763,3.05713c2.25844,0.67865 4.86424,0.61896 6.97286,-0.46289c1.19358,-0.58337 2.25152,-1.79138 1.89277,-3.13031c-0.19726,-0.86096 -0.91521,-1.50519 -1.68655,-1.94641z`}/>
       </g>

       <g >
        < path fill="black" d=" "
        />
      </g>
       <g transform={`scale(${scaleForWholeNoteSvg})`} id="user-playing-note">
        <path fill={userNoteColor} fillOpacity={userNoteOpacity}
        d={`m 66.4,${heightOnStaffUser}c -1.86907,-0.09088 -3.32965,-1.61499 -3.91571,-3.19104c-0.35509,-0.92505 -0.16006,-2.31274 1.02287,-2.57263c1.71386,-0.2674 3.13601,1.07001 3.93307,2.34991c0.5678,0.94922 0.8817,2.44415 -0.18289,3.19659c-0.25277,0.15576 -0.55835,0.2182 -0.85734,0.21716zm2.9775,-5.40332c-2.10578,-1.17487 -4.76581,-1.26642 -7.07169,-0.60889c-1.46067,0.46912 -3.13119,1.4671 -3.14501,3.09137c-0.00101,1.59149 1.61108,2.58429 3.03763,3.05713c2.25844,0.67865 4.86424,0.61896 6.97286,-0.46289c1.19358,-0.58337 2.25152,-1.79138 1.89277,-3.13031c-0.19726,-0.86096 -0.91521,-1.50519 -1.68655,-1.94641z`}/>
       </g>


      </svg>
    </div>

        )

      };



MusicCanvas.propTypes = {
  currentUserNote: PropTypes.object,
  currentPromptedNote: PropTypes.object,
  noteColorFeedback: PropTypes.string



  }

export default MusicCanvas;
// <img src={FClef} alt='different bass clef'></img>

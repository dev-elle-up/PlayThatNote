import React from 'react';
import PropTypes from 'prop-types';
import bassClefPianokeyToYcoord from './BassClefPianokeyToYcoord.js'
// import { devLogger } from '../modules/helperFunctions.js';


function MusicCanvas(props) {

  const scaleForWholeNoteSvg = 2.3;
  const noteHeightForWholeNoteSvg = 7;
  const hideMe = -50;

  const getNoteYfromCanvasY = (svgY, scale, noteHeight) => {
    return (svgY/scale + noteHeight/2)-0.6;
  }

  let userNoteColor = props.noteColorFeedback;
  let userNoteOpacity = props.noteOpacityFeedback;
  let ledgerLineOpacityE4 = 0;
  let ledgerLineOpacityC4 = 0;
  let ledgerLineOpacityE2 = 0;
  let ledgerLineOpacityC2 = 0;

  let heightOnStaffUserNote = hideMe;
  let heightOnStaffPromptedNote = hideMe;

  if (props.currentUserNote) {
    heightOnStaffUserNote = getNoteYfromCanvasY(
      bassClefPianokeyToYcoord[props.currentUserNote.noteNum],
      scaleForWholeNoteSvg,
      noteHeightForWholeNoteSvg);
  }

  if (props.currentPromptedNote) {
    heightOnStaffPromptedNote = getNoteYfromCanvasY(
      bassClefPianokeyToYcoord[props.currentPromptedNote.noteNum],
      scaleForWholeNoteSvg,
      noteHeightForWholeNoteSvg
    )
  }

  if (props.currentPromptedNote && props.currentPromptedNote.ledgerLine) {
    let lineToShow = props.currentPromptedNote.ledgerLine;
    if (lineToShow === "E4") {ledgerLineOpacityC4 = 1; ledgerLineOpacityE4 = 1};
    if (lineToShow === "C4") {ledgerLineOpacityC4 = 1};
    if (lineToShow === "E2") {ledgerLineOpacityE2 = 1};
    if (lineToShow === "C2") {ledgerLineOpacityC2 = 1; ledgerLineOpacityE2 = 1};
  }


  let heightOnStaffPromptedSharp = hideMe;
  if (props.currentPromptedNote && props.currentPromptedNote.sharpOrFlat === 'sharp') {
    heightOnStaffPromptedSharp = bassClefPianokeyToYcoord[props.currentPromptedNote.noteNum];
  }

  let heightOnStaffUserSharp = hideMe;
  if (props.currentUserNote && props.currentUserNote.sharpOrFlat === 'sharp') {
    heightOnStaffUserSharp = bassClefPianokeyToYcoord[props.currentUserNote.noteNum];
  }

  let heightOnStaffPromptedFlat = hideMe;
  if (props.currentPromptedNote && props.currentPromptedNote.sharpOrFlat === 'flat') {
    heightOnStaffPromptedFlat = bassClefPianokeyToYcoord[props.currentPromptedNote.noteNum]
  }

  let heightOnStaffUserFlat = hideMe;
  if (props.currentUserNote && props.currentUserNote.sharpOrFlat === 'flat') {
    heightOnStaffUserFlat = bassClefPianokeyToYcoord[props.currentUserNote.noteNum]
  }

  // let heightOnStaffPromptedNatural = hideMe;
  // let heightOnStaffUserNatural = hideMe;


  let sharpHeightOffset = 18.5;
  let flatHeightOffset = 20;

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

          <path d="M 130,15 h 40" id="staff-line-7-E4" stroke="black" strokeWidth="1.4pt" strokeOpacity={`${ledgerLineOpacityE4}`} />
          <path d="M 130,30 h 40" id="staff-line-6-C4" stroke="black" strokeWidth="1.4pt" strokeOpacity={`${ledgerLineOpacityC4}`} />
          <path d="M 0,45 H 300" id="staff-line-5-A" stroke="black" strokeWidth="1.4pt" />
          <path d="M 0,60 H 300" id="staff-line-4-F" stroke="black" strokeWidth="1.4pt" />
          <path d="M 0,75 H 300" id="staff-line-3-D" stroke="black" strokeWidth="1.4pt" />
          <path d="M 0,90 H 300" id="staff-line-2-B" stroke="black" strokeWidth="1.4pt" />
          <path d="M 0,105 H 300" id="staff-line-1-G" stroke="black" strokeWidth="1.4pt" />
          <path d="M 130,120 h 40" id="staff-line--1-E2" stroke="black" strokeWidth="1.4pt" strokeOpacity={`${ledgerLineOpacityE2}`} />
          <path d="M 130,135 h 40" id="staff-line--2-C2" stroke="black" strokeWidth="1.4pt" strokeOpacity={`${ledgerLineOpacityC2}`} />
        </g>

        <g id="bass-clef-and-dots" transform="scale(.55) translate(-60,-260)">
          <g id="cleffDots" transform="translate(12.21513,0)">
            <path d="M 344.56847 325.81644 A 4.3261919 4.3261919 0 1 0 335.91609,325.81644 A 4.3261919 4.3261919 0 1 0 344.56847 325.81644 z" id="path855"  fill="black" fillOpacity="1"   stroke="black" strokeWidth="1pt" transform="translate(-188.5,32.06472)"/>
            <path d="M 344.56847 325.81644 A 4.3261919 4.3261919 0 1 0 335.91609,325.81644 A 4.3261919 4.3261919 0 1 0 344.56847 325.81644 z" id="path857"  fill="black" fillOpacity="1"   stroke="black" strokeWidth="1pt" transform="translate(-188.5,53.44120)"/>
          </g>
          <g id="bass-clef">
            <path d="M 118.07959 368.82385 A 8.6523838 8.6523838 0 1 0 100.77482,368.82385 A 8.6523838 8.6523838 0 1 0 118.07959 368.82385 z"
            id="clefTipHighlight"  fill="black" fillOpacity="1"   stroke="black" strokeWidth="1pt" transform="matrix(1.397740,0.000000,0.000000,1.397740,-44.92324,-146.3143)"/>
            <path d="M 95.859988,371.63448 C 90.264914,352.12932 103.76008,339.25423 121.54860,338.83318 C 139.59160,338.41213 151.02486,354.43377 151.40900,369.22065 C 152.04763,384.00753 145.38520,396.15050 131.91497,410.73661 C 120.87703,422.89747 99.665017,432.61417 98.088584,431.20186 C 96.332204,429.78955 114.29957,421.85513 125.47619,409.09796 C 132.40912,401.00465 139.51693,383.91281 138.91821,371.26710 C 137.87516,354.61161 124.48340,345.01552 119.25108,344.06033 C 115.79939,343.34942 112.38667,344.18009 109.07043,345.73636 C 106.34185,347.07037 104.63525,349.73327 104.56631,351.19160 C 104.40330,354.38523 108.47495,356.28672 110.68634,356.95999 C 118.94456,359.45486 107.09689,380.69396 95.859988,371.63448 z "
            id="mainBassClef"  fill="black"   stroke="#000000" strokeOpacity="1" strokeWidth="1pt"  fillOpacity="1"/>
          </g>
        </g>

       <g transform={`scale(${scaleForWholeNoteSvg})`} >
        <path fill="#000000" stroke="black" strokeWidth="0.5pt" id="prompted-note"
        d={`m 66.4,${heightOnStaffPromptedNote}c -1.86907,-0.09088 -3.32965,-1.61499 -3.91571,-3.19104c-0.35509,-0.92505 -0.16006,-2.31274 1.02287,-2.57263c1.71386,-0.2674 3.13601,1.07001 3.93307,2.34991c0.5678,0.94922 0.8817,2.44415 -0.18289,3.19659c-0.25277,0.15576 -0.55835,0.2182 -0.85734,0.21716zm2.9775,-5.40332c-2.10578,-1.17487 -4.76581,-1.26642 -7.07169,-0.60889c-1.46067,0.46912 -3.13119,1.4671 -3.14501,3.09137c-0.00101,1.59149 1.61108,2.58429 3.03763,3.05713c2.25844,0.67865 4.86424,0.61896 6.97286,-0.46289c1.19358,-0.58337 2.25152,-1.79138 1.89277,-3.13031c-0.19726,-0.86096 -0.91521,-1.50519 -1.68655,-1.94641z`}/>
       </g>

       <g transform={`translate(118,${heightOnStaffPromptedSharp - sharpHeightOffset}) `} id="prompted-sharp">
         <path fill="#000000" stroke="black" strokeWidth="0.5pt"
         d="M 10.21875 14.234375 L 4.992188 15.910156 L 4.992188 23.714844 L 10.21875 22.039062 L 10.21875 14.234375 M 1.152344 11.71875 L 3.445312 10.988281 L 3.445312 2.449219 L 4.992188 2.449219 L 4.992188 10.460938 L 10.21875 8.785156 L 10.21875 1.140625 L 11.765625 1.140625 L 11.765625 8.316406 L 13.847656 7.632812 L 13.847656 13.082031 L 11.765625 13.761719 L 11.765625 21.515625 L 13.847656 20.886719 L 13.847656 26.28125 L 11.765625 26.960938 L 11.765625 35.5 L 10.21875 35.5 L 10.21875 27.433594 L 4.992188 29.109375 L 4.992188 36.859375 L 3.445312 36.859375 L 3.445312 29.632812 L 1.152344 30.367188 L 1.152344 24.917969 L 3.445312 24.183594 L 3.445312 16.382812 L 1.152344 17.113281 L 1.152344 11.71875 "
       />
       </g>

       <g transform={`translate(120,${heightOnStaffPromptedFlat - flatHeightOffset})`} id="prompted-flat">
         <path fill="#000000" stroke="black" strokeWidth="0.5pt"
         d="M 7.511719 19.332031 C 7.511719 20.65625 7.007812 21.929688 5.628906 23.636719 C 4.164062 25.441406 2.933594 26.476562 1.3125 27.691406 L 1.3125 19.773438 C 1.683594 18.851562 2.226562 18.105469 2.945312 17.535156 C 3.664062 16.964844 4.394531 16.675781 5.132812 16.675781 C 6.347656 16.675781 7.121094 17.359375 7.453125 18.722656 C 7.492188 18.832031 7.511719 19.035156 7.511719 19.332031 Z M 7.335938 13.792969 C 6.332031 13.792969 5.308594 14.066406 4.269531 14.617188 C 3.226562 15.167969 2.242188 15.90625 1.3125 16.820312 L 1.3125 0.0390625 L 0 0.0390625 L 0 28.78125 C 0 29.59375 0.222656 30 0.671875 30 C 0.929688 30 1.253906 29.785156 1.734375 29.5 C 3.09375 28.699219 3.941406 28.160156 4.863281 27.59375 C 5.917969 26.949219 7.101562 26.195312 8.664062 24.71875 C 9.746094 23.644531 10.527344 22.5625 11.011719 21.472656 C 11.496094 20.382812 11.738281 19.300781 11.738281 18.226562 C 11.738281 16.640625 11.3125 15.511719 10.457031 14.84375 C 9.492188 14.144531 8.449219 13.792969 7.335938 13.792969 Z M 7.335938 13.792969 "/>
       </g>

       <g transform={`scale(${scaleForWholeNoteSvg})`} id="user-playing-note">
        <path fill={userNoteColor} fillOpacity={userNoteOpacity}
        d={`m 66.4,${heightOnStaffUserNote}c -1.86907,-0.09088 -3.32965,-1.61499 -3.91571,-3.19104c-0.35509,-0.92505 -0.16006,-2.31274 1.02287,-2.57263c1.71386,-0.2674 3.13601,1.07001 3.93307,2.34991c0.5678,0.94922 0.8817,2.44415 -0.18289,3.19659c-0.25277,0.15576 -0.55835,0.2182 -0.85734,0.21716zm2.9775,-5.40332c-2.10578,-1.17487 -4.76581,-1.26642 -7.07169,-0.60889c-1.46067,0.46912 -3.13119,1.4671 -3.14501,3.09137c-0.00101,1.59149 1.61108,2.58429 3.03763,3.05713c2.25844,0.67865 4.86424,0.61896 6.97286,-0.46289c1.19358,-0.58337 2.25152,-1.79138 1.89277,-3.13031c-0.19726,-0.86096 -0.91521,-1.50519 -1.68655,-1.94641z`}/>
       </g>

       <g transform={`translate(118,${heightOnStaffUserSharp - sharpHeightOffset})`} id="user-sharp">
         <path fill={userNoteColor} fillOpacity={userNoteOpacity}
         d="M 10.21875 14.234375 L 4.992188 15.910156 L 4.992188 23.714844 L 10.21875 22.039062 L 10.21875 14.234375 M 1.152344 11.71875 L 3.445312 10.988281 L 3.445312 2.449219 L 4.992188 2.449219 L 4.992188 10.460938 L 10.21875 8.785156 L 10.21875 1.140625 L 11.765625 1.140625 L 11.765625 8.316406 L 13.847656 7.632812 L 13.847656 13.082031 L 11.765625 13.761719 L 11.765625 21.515625 L 13.847656 20.886719 L 13.847656 26.28125 L 11.765625 26.960938 L 11.765625 35.5 L 10.21875 35.5 L 10.21875 27.433594 L 4.992188 29.109375 L 4.992188 36.859375 L 3.445312 36.859375 L 3.445312 29.632812 L 1.152344 30.367188 L 1.152344 24.917969 L 3.445312 24.183594 L 3.445312 16.382812 L 1.152344 17.113281 L 1.152344 11.71875 "
         />
       </g>

       <g transform={`translate(120,${heightOnStaffUserFlat - flatHeightOffset})`} id="user-flat">
         <path fill={userNoteColor} fillOpacity={userNoteOpacity}
         d="M 7.511719 19.332031 C 7.511719 20.65625 7.007812 21.929688 5.628906 23.636719 C 4.164062 25.441406 2.933594 26.476562 1.3125 27.691406 L 1.3125 19.773438 C 1.683594 18.851562 2.226562 18.105469 2.945312 17.535156 C 3.664062 16.964844 4.394531 16.675781 5.132812 16.675781 C 6.347656 16.675781 7.121094 17.359375 7.453125 18.722656 C 7.492188 18.832031 7.511719 19.035156 7.511719 19.332031 Z M 7.335938 13.792969 C 6.332031 13.792969 5.308594 14.066406 4.269531 14.617188 C 3.226562 15.167969 2.242188 15.90625 1.3125 16.820312 L 1.3125 0.0390625 L 0 0.0390625 L 0 28.78125 C 0 29.59375 0.222656 30 0.671875 30 C 0.929688 30 1.253906 29.785156 1.734375 29.5 C 3.09375 28.699219 3.941406 28.160156 4.863281 27.59375 C 5.917969 26.949219 7.101562 26.195312 8.664062 24.71875 C 9.746094 23.644531 10.527344 22.5625 11.011719 21.472656 C 11.496094 20.382812 11.738281 19.300781 11.738281 18.226562 C 11.738281 16.640625 11.3125 15.511719 10.457031 14.84375 C 9.492188 14.144531 8.449219 13.792969 7.335938 13.792969 Z M 7.335938 13.792969 "/>
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

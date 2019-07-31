import React from 'react';
import PropTypes from 'prop-types';
// import { devLogger } from '../modules/helperFunctions.js';

function Summary(props) {
  // let timeElapsed = props.time_played
  // console.log(timeElapsed);
  return (
    <section>
      <h2>Great job!</h2>
      <p>Notes attempted: {props.notesTried}</p>
      <p>Notes played correctly: {props.notesPlayedCorrectly}</p>
      <p>Notes skipped: {props.notesSkipped}</p>
      <button className="button is-medium mt-1" onClick={props.restartGameCallback}>play again</button>
    </section>
  )
}

Summary.propTypes = {
  notesPlayedCorrectly: PropTypes.number.isRequired,
  notesSkipped: PropTypes.number.isRequired,
  notesTried: PropTypes.number.isRequired,
  timePlayed: PropTypes.string.isRequired,
  restartGameCallback: PropTypes.func.isRequired
}

export default Summary;


// <p>Time played: {props.time_played}</p>

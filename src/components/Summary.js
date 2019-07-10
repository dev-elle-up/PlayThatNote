import React from 'react';

function Summary(props) {
  // let timeElapsed = props.time_played
  // console.log(timeElapsed);
  return (
    <section>
      <p>Great job!</p>
      <p>Notes played correctly: </p>
      <p>Notes skipped: </p>
      <p>Time played: {props.time_played}</p>
      <button onClick={props.restartGameCallback}>play again</button>
    </section>
  )
}

export default Summary;

import React from 'react';

function Summary(props) {
  return (
    <section>
      <p>Great job!</p>
      <p>Notes played correctly: </p>
      <p>Notes skipped: </p>
      <p>Time played: </p>
      <button onClick={props.restartGameCallback}>play again</button>
    </section>
  )
}

export default Summary;

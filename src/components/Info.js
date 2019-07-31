import React from 'react';
import PropTypes from 'prop-types';

function Info (props) {

  return (
    <div className='modal is-active'>
        <div className="modal-background"></div>
        <div className="modal-card">
            <header className="modal-card-head">
                <p className="modal-card-title">Info</p>
                <button className="delete" aria-label="close" onClick={props.toggleInfoShownCallback}></button>
            </header>
            <section className="modal-card-body info-box">
              <p>This app is intended to help you with note recognition and ear training.</p>
              <h2>How to Play</h2>
              <p>Click "Start" to begin.</p>
              <p>A note will be randomly selected and displayed on the staff, in black. When you begin playing, your note will also be shown on the staff, in another color.</p>
              <p>Play the correct note for one second or longer to score a point! You'll see the note turn green when it is correct and then turn purple after one second of holding the correct note. This is when you've scored a point!</p>
              <p>Stop playing any time after the note turns purple to get another note.</p>
              <h2>Skipping Notes</h2>
              <p>Use the skip button to get another note at any time. Don't worry, you won't lose any points!</p>
              <h2>Done for Now</h2>
              <p>When you're done, click "finished" to see a summary of your session.</p>
              <h2>Tuning Arrows</h2>
              <p>Arrows will be displayed to help guide you to match the prompted note. An arrow pointing downward means your pitch is high - move to a lower tone. An upward arrow indicates your pitch is low - move to a higher tone. The arrow will fade as you approach the prompted note.</p>
              <p>Remember: on string instruments, moving your fingers closer to the scroll will produce a lower note. Moving them closer to the bridge (and nearer the ground on a cello) produces a higher note.</p>
            </section>
        </div>
    </div>
  )

}

Info.propTypes = {
  toggleInfoShownCallback: PropTypes.func.isRequired
}

export default Info;

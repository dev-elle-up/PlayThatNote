import React from 'react';

function UserInfo (props) {

  return (
    <div className='modal is-active'>
        <div className="modal-background"></div>
        <div className="modal-card">
            <header className="modal-card-head">
                <p className="modal-card-title">Info</p>
                <button className="delete" aria-label="close" onClick={props.toggleInfoShownCallback}></button>
            </header>
            <section className="modal-card-body">
                User guide will go here.
            </section>
        </div>
    </div>
  )

}

export default UserInfo;

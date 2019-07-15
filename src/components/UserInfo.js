import React, { Component } from 'react';

class UserInfoModal extends Component {
    constructor(props){
        super(props);
        this.state={
            active: true,
        }
    }

    close() {
        this.setState({ active: false });
        this.props.onClose();
    }

    render() {
        return (
        <div className={this.state.active ? 'modal is-active' : 'modal'}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">User Info</p>
                    <button className="delete" aria-label="close" onClick={this.close.bind(this)}></button>
                </header>
                <section className="modal-card-body">
                    User Info WIll go Here
                </section>
            </div>
        </div>
        )
    };
}

export default UserInfoModal;
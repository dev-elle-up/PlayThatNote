import React, { Component } from 'react';
import UserInfoModal from './UserInfo';

class Start extends Component {
  constructor(props){
    super(props);
    this.state={
      infoShown: false
    };
    // console.log('info shown', this.state.infoShown);
    this.toggleInfoShown = this.toggleInfoShown.bind(this);
  }

  toggleInfoShown () {
    this.setState({ infoShown: !this.state.infoShown });
  }

  render() {
    return (
      <div>
        <p className="heading">Ready to practice?</p>
        <div className="buttons mt-1">
          <button className="button" onClick={this.props.startGameCallback}>START</button>
          <button className="button" onClick={this.toggleInfoShown}>INFO</button>
        </div>
        {this.state.infoShown ? <UserInfoModal onClose={this.toggleInfoShown.bind(this)} /> : ''}
      </div>
    )
  };
}

export default Start;

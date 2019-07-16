import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserInfo from './UserInfo';

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
      <section>
        <p className="heading">Ready to practice?</p>
        <div className="buttons">
          <button className="button" onClick={this.props.startGameCallback}>START</button>
          <button className="button" onClick={this.toggleInfoShown}>INFO</button>
          {this.state.infoShown ? <UserInfo toggleInfoShownCallback={this.toggleInfoShown} /> : ''}
        </div>
      </section>
    )
  };
}

Start.propTypes = {
  startGameCallback: PropTypes.func.isRequired
}

export default Start;

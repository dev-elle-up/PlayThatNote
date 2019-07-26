import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Info from './Info';

import 'bulma/css/bulma.min.css';
import '../App.css';

class Start extends Component {
  constructor(props){
    super(props);
    this.state={
      infoShown: false
    };
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
          <button className="button is-large" onClick={this.props.startGameCallback}>START</button>
          <button className="button is-large" onClick={this.toggleInfoShown}>INFO</button>
          {this.state.infoShown ? <Info toggleInfoShownCallback={this.toggleInfoShown} /> : ''}
        </div>
      </section>
    )
  };
}

Start.propTypes = {
  startGameCallback: PropTypes.func.isRequired
}

export default Start;

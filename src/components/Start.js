import React, { Component } from 'react';

class Start extends Component {
  constructor(props){
    super(props);
    this.state={
      infoShown: false
    };
    console.log('info shown', this.state.infoShown);
    this.toggleInfoShown = this.toggleInfoShown.bind(this);
  }


  toggleInfoShown () {
    console.log('in toggleInfoShown', this.state.infoShown);
    this.state.infoShown ? this.setState({infoShown: false}) : this.setState({infoShown: true});
    // if (this.state.infoShown) {
    //   this.setState({infoShown: false});
    // } else {
    //   this.setState({infoShown: true});
    // }
  }

  render() {
    return (
      <section>
        <p>Ready to practice?</p>

        <button onClick={this.props.startGameCallback}>START</button>

        <button onClick={this.toggleInfoShown}>{this.state.infoShown ? 'hide' : 'info'}</button>

        {this.state.infoShown ? <p>User info will go here.</p> : ''}
      </section>
    )
  };
}

export default Start;

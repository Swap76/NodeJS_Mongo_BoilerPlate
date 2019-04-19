import React, { Component } from 'react';
import './root.css';

class Root extends Component {

  constructor() {
      super();
      this.state = {
        message: []
      }
    }
  
    componentDidMount() {
      fetch('/auth/1')
        .then(res => res.json())
        .then(message => this.setState({message}, () => console.log(message)))
    }

  render() {
    return (
      <div>
            <ul>
                {this.state.message.map(message =>
                    <li key={message.id}>  {message.firstName} {message.lastName}</li>)}
            </ul>
      </div>
    );
  }
}

export default Root;

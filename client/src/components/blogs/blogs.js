import React, { Component } from 'react';
import './blogs.css';

class Root extends Component {

  constructor() {
      super();
      this.state = {
        message: []
      }
    }
  
    componentDidMount() {
      fetch('/blog/')
        .then(res => res.json())
        .then(message => this.setState({message}, () => console.log(message)))
    }

  render() {
    return (
      <div>
            <ul>
                {this.state.message.map(message =>
                    <li key={message._id}>  {message.title} </li>)}
            </ul>
      </div>
    );
  }
}

export default Root;

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
        fetch('/api')
          .then(res => res.json())
          .then(message => this.setState({message}, () => console.log(message)))
      }

  render() {
    return (
      <div className="App">
        <h2>This is Main Page</h2>
            <ul>
                {this.state.message.map(message =>
                    <li key={message.id}>  {message.firstName} {message.lastName}</li>)}
            </ul>
      </div>
    );
  }
}

export default Root;

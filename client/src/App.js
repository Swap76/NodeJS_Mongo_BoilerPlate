import React, { Component } from 'react';
import Blog from './components/blogs/blogs';
import Login from './components/login/login';

class App extends Component {

  render() {
    return (
      <div>
        <header>
          <h2 >This is Main Page</h2>
        </header>
        <Login/>
        <Blog/>
      </div>
    );
  }
}

export default App;

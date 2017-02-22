import React, { Component } from 'react';
import { Jumbotron, Button, Grid } from 'react-bootstrap';
import AppToolbar from '../containers/AppToolbar';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="capacita-app">
        <AppToolbar />
        <Jumbotron>
          <Grid>
            <h1>Welcome to React</h1>
            <p>
              <Button
                bsStyle="success"
                bsSize="large"
                href="http://react-bootstrap.github.io/components.html"
                target="_blank">
                View React Bootstrap Docs
              </Button>
            </p>
          </Grid>
        </Jumbotron>
      </div>
    );
  }
}

export default App;

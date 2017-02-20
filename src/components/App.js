import React, { Component } from 'react';
import { Navbar, Jumbotron, Button, Grid } from 'react-bootstrap';
import AppToolbar from '../containers/AppToolbar';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar inverse fixedTop>
          <Grid>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">React App</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
          </Grid>
        </Navbar>
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

            <AppToolbar />
          </Grid>
        </Jumbotron>
      </div>
    );
  }
}

export default App;

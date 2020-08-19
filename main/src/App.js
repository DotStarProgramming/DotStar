import React from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';

import { Home, Automation, Websites, Apps, The10xDeveloper, LotsOfFish, Quote } from "./pages";
import Brand from './smallComponents/Brand';

function App() {
  return (
    <Router>
      <Navbar bg="light" expand="xl">
        <Navbar.Brand href="/">.<span className="accent-text">*</span> <Brand /> Programming</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/automation">Automation</Nav.Link>
            <Nav.Link href="/websites">Websites</Nav.Link>
            <Nav.Link href="/apps">Desktop and Mobile</Nav.Link>
            <Nav.Link href="/the-10x-developer">The 10x Developer</Nav.Link>
            <NavDropdown title="Work We've Done" id="basic-nav-dropdown">
              <NavDropdown.Item href="/lots-of-fish">Lots Of Fish</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/quote">Request a Quote</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route path="/lots-of-fish">
          <LotsOfFish />
        </Route>
        <Route path="/automation">
          <Automation />
        </Route>
        <Route path="/websites">
          <Websites />
        </Route>
        <Route path="/apps">
          <Apps />
        </Route>
        <Route path="/the-10x-developer">
          <The10xDeveloper />
        </Route>
        <Route path="/lots-of-fish">
          <LotsOfFish />
        </Route>
        <Route path="/quote">
          <Quote />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

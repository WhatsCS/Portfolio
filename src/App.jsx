import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import { LinkContainer } from "react-router-bootstrap";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

function Home() {
  return (
    <Container id="Home">
      <Row>
        <Col>
          <Image src="/rp.jpg" />
        </Col>
        <Col>
          <Card bg="light">
            <Card.Img src="/avatar.jpg" />
            <Card.Body>
              <Card.Title>Evan Valmassoi</Card.Title>
              <Card.Subtitle className="text-muted">
                B.S. Computer Science
              </Card.Subtitle>
              <Card.Text>
                Computer Science Major, Gamer, Linux enthusiast. Since his first
                computer until now, Evan has been tinkering with technology.
                Building and trouble shooting desktops, configuring and
                maintaining servers or just writing software.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
    this.getProjects();
  }
  getProjects() {
    fetch("https://api.github.com/users/whatscs/repos")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            items: result.items
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
    return this.state.items;
  }
  Accordion() {
    const items = this.state.items.length === 0 ? this.state.items : null;
    if (items === null) {
      return;
    }
    console.log(items);
    return (
      <Accordion>
        <Card>
          <Accordion.Toggle as={Card.Header}>Test</Accordion.Toggle>
          <Accordion.Collapse>
            <Card.Body>Testing body right now.</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
  render() {
    return (
      <Container>
        <Row>
          <Col></Col>
        </Row>
      </Container>
    );
  }
}

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar variant="dark" bg="dark">
          <LinkContainer to="/">
            <Navbar.Brand className="col-sm-10">Portfolio</Navbar.Brand>
          </LinkContainer>
          <Nav className="col-sm-2">
            <Nav.Item>
              <LinkContainer to="/Home">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to="/Projects">
                <Nav.Link>Projects</Nav.Link>
              </LinkContainer>
            </Nav.Item>
          </Nav>
        </Navbar>
        <Switch>
          <Route path="/Home">
            <Home />
          </Route>
          <Route path="/Projects">
            <Projects />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

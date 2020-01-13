import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import { LinkContainer } from "react-router-bootstrap";
import { HashRouter as Router, Route } from "react-router-dom";
import { AnimatedSwitch, spring } from "react-router-transition";
import ProjectAccordion from "./components/accordion";
import "./App.css";

function glide(val) {
  return spring(val, {
    stiffness: 110,
    damping: 29,
  });
}

function Home() {
  return (
    <Container id="Home">
      <Row>
        <Col id="resume">
          <Image src="/rp.jpg" alt="resume" />
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
                maintaining servers or just writing software (including this
                website!).
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
    this.acc = this.acc.bind(this);
    this.state = {
      repos_error: null,
      repos_isLoaded: false,
      items: [],
    };
  }

  componentDidMount() {
    fetch("https://api.github.com/users/whatscs/repos")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            repos_isLoaded: true,
            repos_items: result.map((repo, index) => ({
              name: repo.name,
              url: repo.html_url,
              description: repo.description,
              fork: repo.fork,
              language: repo.language === null ? null : repo.language,
              i: index
            }))
          });
        },
        error => {
          this.setState({
            repos_isLoaded: true,
            repos_error: error
          });
        }
      );
  }

  acc() {
    if (this.state.repos_isLoaded) {
      var result = this.state.repos_items.map(repo => (
        <ProjectAccordion repo={repo} />
      ));
      return <Accordion defaultActiveKey="0">{result}</Accordion>;
    }
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <this.acc />
          </Col>
        </Row>
      </Container>
    );
  }
}

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar variant="dark" bg="purple">
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
        <AnimatedSwitch
          atEnter={{
            offset: 100,
          }}
          atLeave={{ offset: glide(-100) }}
          atActive={{ offset: glide(0) }}
          runOnMount={false}
          mapStyles={styles => ({
            transform: `translateX(${styles.offset}%)`,
          })}
          className="switch-wrapper">
          <Route path="/Home">
            <Home />
          </Route>
          <Route path="/Projects">
            <Projects />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </AnimatedSwitch>
      </Router>
    </div>
  );
}

export default App;

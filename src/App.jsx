import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Accordion from "react-bootstrap/Accordion";
import Alert from "react-bootstrap/Alert";
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
import * as dotenv from "dotenv";

dotenv.config();

const TEST = gql`
  {
    viewer {
      node {
        name
      }
    }
  }
`;

const GET_ALL = gql`
  {
    viewer {
      login
      repositories(first: 10, privacy: PUBLIC, ownerAffiliations: OWNER) {
        edges {
          node {
            name
            description
            url
            languages(first: 10) {
              edges {
                node {
                  name
                }
              }
            }
            object(expression: "master:README.md") {
              ... on Blob {
                text
              }
            }
          }
        }
      }
    }
  }
`;

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

function Projects() {
  const [isLoaded, setisLoaded] = useState(false);
  const [Rerror, setError] = useState(null);
  const [items, setItems] = useState();

  const { loading, error, data } = useQuery(TEST);

  if (loading)
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  if (error) {
    return <div>{error.message}</div>;
  }
  console.log(data);
  // if (this.state.repos_isLoaded && this.state.repos_error === null) {
  //   let result = this.state.items.map(repo => <ProjectAccordion repo={repo} />);
  //   return <Accordion defaultActiveKey="0">{result}</Accordion>;
  // }
  // else if (this.state.repos_isLoaded) {
  //   return (
  //     <Alert variant="danger">
  //       <Alert.Heading>Error</Alert.Heading>
  //     </Alert>
  //   );
  // }
  //   return (
  //     <Spinner animation="border" role="status">
  //       <span className="sr-only">Loading...</span>
  //     </Spinner>
  //   );
  // }
  return (
    <Container>
      <Row>
        <Col>{data}</Col>
      </Row>
    </Container>
  );
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

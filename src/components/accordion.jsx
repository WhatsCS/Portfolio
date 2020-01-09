import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

export default function ProjectAccordion(props) {
  const repo = props.repo;
  const url = <Card.Link href={repo.url}>GitHub</Card.Link>;
  const language = repo.language === null ? "" : repo.language + " | ";
  return (
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey={repo.i}>
        {repo.name}
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={repo.i}>
        <Card.Body>
          <Card.Title>{repo.name}</Card.Title>
          <Card.Subtitle>
            {language}
            {url}
          </Card.Subtitle>
          <Card.Text>
            <p>{repo.description}</p>
          </Card.Text>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
}

function ReadMeEmbed(props) {}

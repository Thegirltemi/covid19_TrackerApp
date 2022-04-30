import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { CardGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container"
function App() {

  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios
      .all([
        axios.get("https://corona.lmao.ninja/v2/all"),
        axios.get("https://corona.lmao.ninja/v2/countries"),
      ])

      .then((responseArr) => {
        setLatest(responseArr[0].data);
        setResults(responseArr[1].data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const date = new Date(parseInt(latest.updated));
  const lastUpdated = date.toString();

  const countries = results.map((data, i) => {
    return (
      <Card
        key={i}
        bg="light"
        text="dark"
        className="text-center"
        style={{ margin: "10px" }}
      >
        <Card.Img variant="top" src={data.countryInfo.flag} />
        <Card.Body>
          <Card.Title>{data.country}</Card.Title>
          <Card.Text>Cases{data.cases}</Card.Text>
          <Card.Text>Deaths{data.deaths}</Card.Text>
          <Card.Text>Recovered{data.recovered}</Card.Text>
          <Card.Text>Active{data.active}</Card.Text>
          <Card.Text>Critical{data.critical}</Card.Text>
        </Card.Body>
      </Card>
    );
  });

  return (
    <div>
      <CardGroup>
        <Card
          bg="secondary"
          text="white"
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>Cases</Card.Title>
            <Card.Text>{latest.cases}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>
        <Card
          bg="danger"
          text="white"
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>Deaths</Card.Title>
            <Card.Text>{latest.deaths}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>
        <Card
          bg="success"
          text="white"
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>Recovered</Card.Title>
            <Card.Text>{latest.recovered}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>
      </CardGroup>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs lg="2">
            {countries}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;

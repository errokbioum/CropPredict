import React from "react";

// reactstrap components
import { Button, Container, Row, Col, UncontrolledCarousel } from "reactstrap";
import { Link } from "react-router-dom"; // Import de Link

const items = [
  {
    src: require("assets/img/brand/rcmd3.jpeg"),
    altText: "",
    caption: "",
    header: "",
  },
  {
    src: require("assets/img/brand/size.png"),
    altText: "",
    caption: "",
    header: "",
  },
];

class Carousel2 extends React.Component {
  render() {
    return (
      <>
        <section style={{ backgroundColor: "white", marginTop: "200px" }}>
          <Container className="py-md">
            <Row className="justify-content-between align-items-center">
              {/* Colonne avec l'image à gauche */}
              <Col className="mb-lg-auto" lg="6">
                <div className="rounded shadow-lg overflow-hidden transform-perspective-right">
                  <UncontrolledCarousel items={items} interval={2000} /> {/* Ajout de l'interval */}
                </div>
              </Col>
              {/* Colonne avec le texte à droite */}
              <Col className="mb-5 mb-lg-0" lg="5">
                <h1 className="text-dark font-weight-light">Votre Recomandation agricole </h1>
                <p className="lead text-dark mt-4">
                Grâce à nos recommandations personnalisées, notamment de conseils adaptés à votre sol, climat et cultures. Maximisez vos rendements, réduisez vos coûts et adoptez des pratiques durables pour une agriculture performante et responsable.
                </p>
                <Link to="/Recomandation">
                  <Button className="btn mt-4">recevoir votre recommandation</Button>
                </Link>
              </Col>
            </Row>
          </Container>
          {/* SVG separator */}
          <div className="separator separator-bottom separator-skew">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon className="fill-white" points="2560 0 2560 100 0 100" />
            </svg>
          </div>
        </section>
      </>
    );
  }
}

export default Carousel2;

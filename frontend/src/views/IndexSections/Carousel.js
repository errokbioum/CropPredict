import React from "react";
import './index.css'

// reactstrap components
import { Button, Container, Row, Col, UncontrolledCarousel } from "reactstrap";
import { Link } from "react-router-dom";

const items = [
  {
    src: require("assets/img/brand/predict1.jpg"),
    altText: "",
    caption: "",
    header: "",
  },
  {
    src: require("assets/img/brand/predict4.jpg"),
    altText: "",
    caption: "",
    header: "",
  },
];

class Carousel extends React.Component {
  render() {
    return (
      <>
        <section style={{ backgroundColor: "white", paddingTop: "200px" }}>
          <Container className="py-md">
            <Row className="justify-content-between align-items-center">
              <Col className="mb-5 mb-lg-0" lg="5">
                <h1 className="text-dark font-weight-light">
                  Prédiction de votre rendement agricole
                </h1>
                <p className="lead text-dark mt-4">
                  Découvrez le pouvoir de la prédiction pour optimiser vos
                  rendements agricoles. Grâce à l'analyse avancée des données
                  climatiques et des tendances de culture, notre solution vous
                  permet de prévoir précisément le rendement de vos récoltes.
                  Évitez les mauvaises surprises, ajustez vos pratiques
                  agricoles et augmentez vos profits tout en réduisant les risques.
                </p>
                <Link to="/Prédiction">
                  <Button className="btn mt-4">Prédire maintenant </Button>
                </Link>
              </Col>
              <Col className="mb-lg-auto" lg="6">
                <div className="rounded shadow-lg overflow-hidden transform-perspective-right">
                  {/* Réduction de l'intervalle à 2000 ms (2 secondes) */}
                  <UncontrolledCarousel items={items} interval={2000} />
                </div>
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

export default Carousel;

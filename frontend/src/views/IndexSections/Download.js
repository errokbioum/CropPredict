import React from "react";
import { Button, Container, Row, Col, UncontrolledTooltip } from "reactstrap";
import "./index.css"; // Assurez-vous d'ajouter un fichier CSS pour les animations

class Download extends React.Component {
  render() {
    return (
      <>
        <section className="section section-lg smaller-font-global">
          <Container>
            <Row className="row-grid justify-content-center align-items-center">
              {/* Colonne gauche pour l'écriture avec animation */}
              <Col className="text-left" lg="5">
                <h2 className="display-3 animated-brilliant-text black-title">
                  Bientôt disponible partout ?
                </h2>
                <p className="lead">
                  Notre application connaît une croissance rapide et sera bientôt accessible dans le monde entier. Nous mettons tout en œuvre pour vous offrir un service fiable et performant, où que vous soyez. Restez à l'écoute pour découvrir très prochainement toutes ses fonctionnalités, sans aucune limite géographique.
                </p>
                <div className="btn-wrapper">
                  {/* Vous pouvez ajouter des boutons ici */}
                </div>
              </Col>
              {/* Colonne droite pour l'image */}
              <Col lg="5" className="text-right">
                <img
                  alt="assets/img/brand/card.png"
                  className="img-fluid mb-5 animated-image"
                  src={require("assets/img/brand/card.png")}
                />
              </Col>
            </Row>
            <div className="text-center">
              <Row className="justify-content-center">
                <Col lg="2" xs="4">
                  
                </Col>
              </Row>
            </div>
          </Container>
        </section>
      </>
    );
  }
}

export default Download;

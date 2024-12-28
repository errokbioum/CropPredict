import React from "react";
import { Container, Row, Col } from "reactstrap";

class AmazingTeam extends React.Component {
  render() {
    return (
      <section className="section bg-light text-center">
        <Container>
          <h2 className="display-4 text-dark mb-5">Notre Équipe</h2>
          <Row className="justify-content-center">
            {/* Première image */}
            <Col md="4" className="mb-4">
              <div className="team-member">
                <img
                  src={require("assets/img/brand/wiam1.jpeg")}
                  className="rounded-circle shadow"
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
                <h5 className="mt-3">Ahrardi Wiam</h5>
                <p className="text-muted">Chef de projet </p>
              </div>
            </Col>

            {/* Deuxième image */}
            <Col md="4" className="mb-4">
              <div className="team-member">
                <img
                 src={require("assets/img/brand/oumaima1.png")}
                  className="rounded-circle shadow"
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
                <h5 className="mt-3">Errokbi Oumaima</h5>
                <p className="text-muted">Chef de l'équipe de développement  </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

export default AmazingTeam;

import React from "react";
import { Container, Row, Col } from "reactstrap";

class Quinous extends React.Component {
  render() {
    return (
      <>
        <section className="section section-lg" style={{ padding: "40px 0" }}>
          <Container>
            <Row className="row-grid justify-content-center">
              <Col lg="7"> {/* Réduction de la largeur de la colonne */}
                {/* Card avec arrière-plan blanc et coins arrondis */}
                <div
                  style={{
                    backgroundColor: "white",
                    borderRadius: "12px", // Coins arrondis réduits
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Légère réduction de l'ombre
                    padding: "25px", // Réduction du padding
                  }}
                >
                  {/* Titre et description */}
                  <div className="text-center">
                    <h2
                      className="display-4" // Passage à display-4 pour une taille légèrement inférieure
                      style={{ fontWeight: "bold", color: "#2E8B57", fontSize: "1.8rem" }}
                    >
                      Qui sommes-nous ?{" "}
                      <span style={{ color: "#FFA500" }}>CropYeild</span>
                    </h2>
                    <p
                      className="lead"
                      style={{
                        fontSize: "1rem", // Réduction de la taille de police
                        fontWeight: "500",
                        marginTop: "12px", // Réduction de l'espacement
                      }}
                    >
                      Notre mission est de transformer l'agriculture grâce à la
                      technologie. En tant qu'entreprise innovante, nous développons des
                      solutions numériques avancées pour accompagner les agriculteurs dans
                      leurs décisions quotidiennes. Nous croyons fermement qu'en combinant
                      science, technologie et expertise agricole, il est possible d'optimiser
                      les rendements et de promouvoir une agriculture durable et prospère.
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </>
    );
  }
}

export default Quinous;

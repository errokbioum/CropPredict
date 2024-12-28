import React from "react";
import { Container, Row, Col } from "reactstrap";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./index.css"; // Importation du fichier CSS

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slides: [
        {
          src: require("assets/img/brand/background.jpg"),
          text: "Bienvenue sur CropPredict - Le meilleur choix pour vos prévisions agricoles!"
        },
        {
          src: require("assets/img/brand/Blog2.jpeg"),
          text: "Optimisez vos récoltes grâce à nos solutions avancées de prédiction."
        },
        {
          src: require("assets/img/brand/end1.jpeg"),
          text: "L'agriculture de demain commence aujourd'hui avec CropPredict."
        }
      ],
      currentImageIndex: 0,
      animationKey: Date.now(),  // Clé unique pour chaque animation de texte
    };
    this.imageInterval = null;
  }

  componentDidMount() {
    this.imageInterval = setInterval(this.nextImage, 3000); // Change l'image toutes les 3 secondes
  }

  componentWillUnmount() {
    clearInterval(this.imageInterval);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentImageIndex !== this.state.currentImageIndex) {
      // Mettre à jour la clé pour redémarrer l'animation du texte
      this.setState({ animationKey: Date.now() });
    }
  }

  nextImage = () => {
    this.setState((prevState) => ({
      currentImageIndex: (prevState.currentImageIndex + 1) % prevState.slides.length
    }));
  };

  prevImage = () => {
    this.setState((prevState) => ({
      currentImageIndex: (prevState.currentImageIndex - 1 + prevState.slides.length) % prevState.slides.length
    }));
  };

  render() {
    const { slides, currentImageIndex, animationKey } = this.state;
    const currentSlide = slides[currentImageIndex];

    return (
      <>
        <div className="position-relative">
          <section
            className="section section-hero section-shaped"
            style={{
              backgroundImage: `url(${currentSlide.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "95vh",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))",
                zIndex: 1,
              }}
            ></div>

            <Container
              className="shape-container d-flex align-items-center py-lg"
              style={{ position: "relative", zIndex: 2 }}
            >
              <div className="col px-0">
                <Row className="align-items-center justify-content-start">
                  <Col className="text-left" lg="6">
                    {/* Texte animé avec une clé unique pour réinitialiser l'animation */}
                    <h1 className="text-animation" key={animationKey}>
                      {currentSlide.text}
                    </h1>
                  </Col>
                </Row>
              </div>
            </Container>

            <div
              className="separator separator-bottom separator-skew"
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                zIndex: 3,
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 95"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                  style={{
                    fill: "white",
                  }}
                />
              </svg>
            </div>
          </section>

          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "20px",
              zIndex: 105,
              transform: "translateY(-50%)",
            }}
          >
            <button
              onClick={this.prevImage}
              style={{
                backgroundColor: "transparent",
                border: "none",
                fontSize: "2rem",
                color: "white",
                cursor: "pointer",
              }}
            >
              <FaArrowLeft />
            </button>
          </div>
          <div
            style={{
              position: "absolute",
              top: "50%",
              right: "20px",
              zIndex: 105,
              transform: "translateY(-50%)",
            }}
          >
            <button
              onClick={this.nextImage}
              style={{
                backgroundColor: "transparent",
                border: "none",
                fontSize: "2rem",
                color: "white",
                cursor: "pointer",
              }}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default Home;

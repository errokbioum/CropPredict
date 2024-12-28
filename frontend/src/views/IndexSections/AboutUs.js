import React from "react";
// nodejs library that concatenates classes
import { FaQuestionCircle } from "react-icons/fa";

// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";

// index page sections
import SimpleFooter from "components/Footers/SimpleFooter.js";
import Quinous from "views/IndexSections/Quinous.js";

class AboutUs extends React.Component {
  state = {};
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    return (
      <>
        <DemoNavbar />
        <main ref="main">
          <div className="position-relative">
        {/* shape Hero */}
        <section
  className="section section-lg section-shaped pb-250"
  style={{
    backgroundImage: `url(${require("../../assets/img/brand/agrico.jpg")})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
  }}
>
  <div className="shape shape-style-1 shape-default">
    <span />
    <span />
    <span />
    <span />
    <span />
    <span />
    <span />
    <span />
    <span />
  </div>
  <Container className="py-lg-md d-flex">
    <div className="col px-0">
      {/* Aucune écriture ni bouton */}
    </div>
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
      <polygon
        className="fill-white"
        points="2560 0 2560 100 0 100"
      />
    </svg>
  </div>
  {/* Card Quinous */}
  <div
                style={{
                  position: "absolute",
                  top: "71%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 10,
                  width: "78%", // Ajustez la largeur selon vos besoins
                  maxWidth: "1500px", // Limitez la largeur
                }}
              >
                <Quinous />
              </div>
</section>

            {/* 1st Hero Variation */}
          </div>
          <section className="section section-lg pt-lg-0 mt--100">
         
          </section>
          <section className="section section-lg">
            <Container>
              <Row className="row-grid align-items-center">
                <Col className="order-md-2" md="6">
                <div
                 style={{
                  width: "1000px",
                 height: "1000px",
                 overflow: "hidden",
                position: "relative", // Nécessaire pour que le décalage soit visible
                 }}
>
                 <img
                 alt="..."
                 className="img-fluid floating"
                 src={require("assets/img/theme/image.png")}
                 style={{
                  width: "82%",
                  height: "auto",
                 position: "relative",
                 top: "185px", // Décale vers le bas
                 left: "-125px", // Décale vers la gauche
                 }}
                 />
                </div>
                </Col>
                <Col className="order-md-1" md="6">
  <div className="pr-md-5">
  <div className="d-flex align-items-center mb-4">
      <FaQuestionCircle 
        size={50} 
        color="#FF8C00" 
        style={{ marginRight: "10px" }} 
      />
      <h3 style={{ color: "#FF8C00", fontSize: "1.3rem" }}> Pourquoi nous choisir </h3>
    </div>
    
    {/* Description avec une taille de texte augmentée */}
    <p style={{ fontSize: "0.9rem" }}>
      Chez nous, les agriculteurs sont au centre de toutes nos actions.
      Nous sommes déterminés à leur fournir des outils qui non seulement améliorent 
      leur quotidien, mais qui participent également à une agriculture plus durable,
      capable de répondre aux défis actuels et futurs.
    </p>
    
    {/* Liste des points */}
    <ul className="list-unstyled mt-5">
      <li className="py-2">
        <div className="d-flex align-items-center">
          {/* Image à la place de l'icône */}
          <div>
            <img
              src={require("assets/img/brand/icone1.png")}
              alt="Technologie de pointe"
              style={{ width: "40px", height: "40px", marginRight: "10px" }}
            />
          </div>
          <div>
            <h6 className="mb-0" style={{ fontSize: "0.9rem" }}>
              Technologie de pointe : Nos outils intègrent les dernières avancées 
              en intelligence artificielle et en science des données.
            </h6>
          </div>
        </div>
      </li>
      <li className="py-2">
        <div className="d-flex align-items-center">
          <div>
            <img
              src={require("assets/img/brand/icone2.png")}
              alt="Accessibilité"
              style={{ width: "40px", height: "40px", marginRight: "10px" }}
            />
          </div>
          <div>
            <h6 className="mb-0" style={{ fontSize: "0.9rem" }}>
              Accessibilité : Nous nous engageons à rendre nos solutions simples d'utilisation 
              et accessibles à tous les agriculteurs, quel que soit leur niveau de familiarité avec la technologie.
            </h6>
          </div>
        </div>
      </li>
      <li className="py-2">
        <div className="d-flex align-items-center">
          <div>
            <img
              src={require("assets/img/brand/icone3.png")}
              alt="Impact durable"
              style={{ width: "40px", height: "40px", marginRight: "10px" }}
            />
          </div>
          <div>
            <h6 className="mb-0" style={{ fontSize: "0.9rem" }}>
              Impact durable : Nos recommandations favorisent une agriculture 
              respectueuse de l'environnement et économiquement viable.
            </h6>
          </div>
        </div>
      </li>
    </ul>
  </div>
</Col>

              </Row>
            </Container>
          </section>
          <section className="section bg-secondary">
  <Container>
    <Row className="row-grid align-items-center">
      <Col md="6">
      <Card className="shadow border-0" style={{ backgroundColor: "#FF8C00" , height : "20%" }}>
  <CardImg
    alt="..."
    src={require("assets/img/brand/organicgirl.jpg")}
    top
  />
          <blockquote className="card-blockquote">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="svg-bg"
              preserveAspectRatio="none"
              viewBox="0 0 583 95"
            >
              <polygon
                className="fill-orange"
                fill="#FF8C00"
                points="0,52 583,95 0,95"
              />
              <polygon
                className="fill-orange"
                fill="#FF8C00"
                opacity=".2"
                points="0,42 583,95 683,0 0,95"
              />
            </svg>
            <h4 className="display-3 font-weight-bold text-white">
              Prédiction des rendements agricoles
            </h4>
            <p className="lead text-italic text-white">
            </p>
          </blockquote>
        </Card>
      </Col>
      <Col md="6">
        <div className="pl-md-5">
          <div className="icon icon-lg icon-shape icon-shape-warning shadow rounded-circle mb-5">
            <img
              alt="Custom Icon"
              src={require("assets/img/brand/icone2.png")}
              className="icon-img"
              style={{ width: "50px", height: "50px" }}
            />
          </div>
          <h3>Service de Prédiction</h3>
          <p className="lead">
            L’un de nos services phares repose sur l’utilisation d’algorithmes
            sophistiqués basés sur l’intelligence artificielle et l’analyse
            approfondie de données climatiques et agricoles.
          </p>
          <p>
            Ces outils permettent de fournir des prédictions précises sur les
            rendements agricoles potentiels pour différentes cultures. En
            offrant une vision claire et scientifiquement fondée des attentes
            de production, ce service aide les agriculteurs à mieux organiser
            leurs semis, à anticiper les périodes de récolte et à réduire les
            incertitudes liées aux aléas climatiques. Ainsi, il devient possible
            d’améliorer la gestion des ressources et de limiter les pertes
            financières.
          </p>
          <a
            className="font-weight-bold text-warning mt-5"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
           Commencer votre expérience dès maintenant 
          </a>
        </div>
      </Col>
    </Row>
  </Container>
</section>
<section className="section bg-secondary" style={{ direction: 'rtl' }}>
  <Container>
    <Row className="row-grid align-items-center">
      <Col md="6">
        <Card className="shadow border-0" style={{ backgroundColor: "#FF8C00", height: "20%" }}>
          <CardImg
            alt="..."
            src={require("assets/img/brand/background2.jpg")}
            top
          />
          <blockquote className="card-blockquote">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="svg-bg"
              preserveAspectRatio="none"
              viewBox="0 0 583 95"
            >
              <polygon
                className="fill-orange"
                fill="#FF8C00"
                points="0,52 583,95 0,95"
              />
              <polygon
                className="fill-orange"
                fill="#FF8C00"
                opacity=".2"
                points="0,42 583,95 683,0 0,95"
              />
            </svg>
            <h4 className="display-3 font-weight-bold text-white">
             Recommandation de cultures adaptées
            </h4>
            <p className="lead text-italic text-white">
            </p>
          </blockquote>
        </Card>
      </Col>

      <Col md="6">
        <div className="pr-md-5">
          <div className="icon icon-lg icon-shape icon-shape-warning shadow rounded-circle mb-5">
            <img
              alt="Custom Icon"
              src={require("assets/img/brand/icone1.png")}
              className="icon-img"
              style={{ width: "50px", height: "50px" }}
            />
          </div>
          <h3>Service de Recommandation </h3>
          <p className="lead">
          Pour accompagner les agriculteurs dans leurs décisions, nous offrons un service d’analyse des caractéristiques des terres agricoles. Cela inclut l’étude du type de sol, du climat, et de la disponibilité en eau. Grâce à ces données, nous proposons des recommandations personnalisées sur les cultures les mieux adaptées à chaque terrain.
          </p>
          <p>
          Ce processus favorise une utilisation optimale des ressources naturelles et contribue à augmenter les rendements tout en minimisant les impacts environnementaux. En mettant en avant des cultures adaptées, les agriculteurs peuvent également diversifier leurs plantations, répondre aux exigences du marché et s’engager dans des pratiques agricoles durables.
          </p>
          <a
            className="font-weight-bold text-warning mt-5"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            Commencer votre expérience dès maintenant
          </a>
        </div>
      </Col>
    </Row>
  </Container>
</section>

        
          
        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default AboutUs;
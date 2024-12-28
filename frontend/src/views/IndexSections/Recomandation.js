import React from "react";
import axios from "axios";
import { Button, Card, CardBody, CardHeader, FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Container, Row, Col } from "reactstrap";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import { Bar } from 'react-chartjs-2';
import './Recomandation.css';
import { API_BASE_URL } from "config/api";

import stateData from "./state.json";

const seasons = ["Summer", "Kharif", "Autumn", "Rabi", "Annual"];

class Recomandation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nitrogen: "",
      phosphorous: "",
      pottasium: "",
      ph: "",
      season: "",
      state: "",
      city: "",
      crop: "",
      result: null,
      isLoading: false,
      humidity: "",
      rainfall: "",
      temperature: "",
      bestRecommendation: "",
      isEmailSending: false,
      emailMessage: "",
      email: "",
      recommendationId: null,
    };
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });

    if (name === "state") {
      this.setState({ city: "" });
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });

    const jwtToken = localStorage.getItem("jwt");
    if (!jwtToken) {
      alert("No JWT token found. Please log in.");
      return;
    }

    try {
      const { nitrogen, phosphorous, pottasium, ph, season, state, city, crop } = this.state;
      const userData = {
        nitrogen: parseFloat(nitrogen),
        phosphorous: parseFloat(phosphorous),
        pottasium: parseFloat(pottasium),
        ph: parseFloat(ph),
        season,
        state,
        city,
        crop,
      };

      const response = await axios.post(
        `${API_BASE_URL}/api/recommendations/generate`,
        { formdata: userData },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      this.setState({
        bestRecommendation: response.data.result.prediction[0],
        temperature: response.data.result.temperature,
        humidity: response.data.result.humidity,
        rainfall: response.data.result.rainfall,
        recommendationId: response.data.id,
        result: response.data.result.chart_data,
        isLoading: false
      });
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("Failed to fetch recommendation. Check console for details.");
      this.setState({ isLoading: false });
    }
  };

  handleEmailSubmit = async () => {
    const { email, recommendationId } = this.state;

    if (!email) {
      alert("Please enter an email.");
      return;
    }

    const jwtToken = localStorage.getItem("jwt");
    if (!jwtToken) {
      alert("No JWT token found. Please log in.");
      return;
    }

    this.setState({ isEmailSending: true });

    try {
      await axios.post(
        `${API_BASE_URL}/api/emails/send-recommendation/${recommendationId}`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      this.setState({
        isEmailSending: false,
        emailMessage: "Email sent successfully!",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      this.setState({
        isEmailSending: false,
        emailMessage: "Failed to send email. Please try again.",
      });
    }
  };

  renderGraph = () => {
    const { result } = this.state;

    if (!result) return null;

    const crops = Object.keys(result);
    const probabilities = Object.values(result);
    

    return (
      <Bar
        data={{
          labels: crops,
          datasets: [
            {
              label: "Probability",
              data: probabilities,
              backgroundColor: "rgba(255,159,64,0.6)",
              borderColor: "rgba(255,159,64,1)",
              borderWidth: 1,
 },
          ],
        }}
        options={{
          scales: {
            y: {
              beginAtZero: true,
              max: 1,
            },
          },
        }}
      />
    );
  };

  render() {
    const {
      isLoading,
      isEmailSending,
      email,
      emailMessage,
      bestRecommendation,
      state,
      humidity,
      temperature,
      rainfall,
      nitrogen,
      ph,
      phosphorous,
      pottasium,
      city,
    } = this.state;
    return (
      <>
        <DemoNavbar />
        <main ref="main">
          <section className="section section-shaped section-lg">
            <div className="shape shape-style-1 bg-gradient-orange">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <Container className="pt-lg-7">
              <Row className="justify-content-center">
                <Col lg="8">
                  <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-white pb-5">
                      <div className="text-muted text-center mb-3">
                        <h2 className="text-orange">Recommandation de Culture</h2>
                      </div>
                      <div className="text-center">
                        <p>Utilisez ce formulaire pour obtenir une recommandation de culture basée sur les conditions de votre sol et les données météorologiques.</p>
                      </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                      <Form role="form" onSubmit={this.handleSubmit}>
                        <Row>
                          <Col md="6">
                            {this.renderFormGroup("Azote", "nitrogen", "number", nitrogen, "ni ni-atom", "Entrez la quantité d'azote dans le sol (en kg/ha).")}
                            {this.renderFormGroup("pH du sol", "ph", "number",ph, "ni ni-ruler-pencil", "Entrez le niveau de pH caractéristique de votre sol.")}
                            {this.renderDropdown("État", "state", Object.keys(stateData), "ni ni-map-big", "Sélectionnez votre état.")}
                            {this.renderDropdown("Saison", "season", seasons, "ni ni-calendar-grid-58", "Sélectionnez la saison de plantation que vous souhaitez.")}
                            {this.renderFormGroup("Humidité (%)", "humidity", "text", humidity, "ni ni-world-2", "Le taux d'humidité moyen prévu pour votre région.", true)} 
                           </Col>
                          <Col md="6"> 
                            {this.renderFormGroup("Phosphore", "phosphorous", "number",phosphorous, "ni ni-atom", "Entrez la quantité de phosphore dans le sol (en kg/ha).")}
                            {this.renderFormGroup("Potassium", "pottasium", "number", pottasium,"ni ni-atom", "Entrez la quantité de potassium dans le sol (en kg/ha).")}
                            {this.renderDropdown("Ville", "city", stateData[state] || [], "ni ni-building", "Sélectionnez votre ville.")}
                            {this.renderFormGroup("Température (°C)", "temperature", "text", temperature, "ni ni-world-2", "La température moyenne prévue pour votre région.", true)}
                            {this.renderFormGroup("Précipitations (mm)", "rainfall", "text", rainfall, "ni ni-world-2", "Les précipitations moyennes prévues pour votre région.", true)}
                           </Col>
                        </Row>
                        
                        <div className="text-center">
                          <Button
                            className="my-4"
                            color="primary"
                            type="submit"
                            disabled={isLoading}
                          >
                            {isLoading ? "Chargement..." : "Soumettre"}
                          </Button>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                  {bestRecommendation && (
                    <Card className="bg-secondary shadow border-0 mt-5">
                      <CardHeader className="bg-white pb-5">
                        <div className="text-muted text-center mb-3">
                          <h2 className="text-orange">Résultats de la Recommandation</h2>
                        </div>
                      </CardHeader>
                      <CardBody className="px-lg-5 py-lg-5">
                        <h4 className="text-center mb-4">
                          Meilleure recommandation : {bestRecommendation}
                        </h4>
                        {this.renderGraph()}
                        <div className="text-center mt-4">
                          <img
                            src={require(`../../assets/crops/${bestRecommendation}.png`)}
                            alt={bestRecommendation}
                            className="recommendation-image"
                          />
                        </div>
                        <Form className="mt-4">
                          <FormGroup>
                            <Input
                              name="email"
                              placeholder="Entrez votre adresse e-mail"
                              type="email"
                              value={email}
                              onChange={this.handleInputChange}
                            />
                          </FormGroup>
                          <div className="text-center">
                            <Button
                              color="primary"
                              onClick={this.handleEmailSubmit}
                              disabled={isEmailSending}
                            >
 {isEmailSending ? "Envoi..." : "Envoyer par E-mail"}
                            </Button>
                          </div>
                          {emailMessage && (
                            <div className="text-center mt-3">
                              <p>{emailMessage}</p>
                            </div>
                          )}
                        </Form>
                      </CardBody>
                    </Card>
                  )}
                </Col>
              </Row>
            </Container>
          </section>
        </main>
        <SimpleFooter />
        {isLoading && (
          <div className="loading-overlay">
            <div className="loader"></div>
            <div className="loading-text">Récupération de la recommandation...</div>
          </div>
        )}
      </>
    );
  }

 
  renderFormGroup(label, name, type, value, icon, description, readOnly = false) {
    return (
      <FormGroup>
        <label>{label}</label>
        <InputGroup className="input-group-alternative">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className={icon} />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            name={name}
            type={type}
            value={value}
            onChange={this.handleInputChange}
            placeholder={`Entrez ${label.toLowerCase()}`}
            readOnly={readOnly}
          />
        </InputGroup>
        <small className="text-muted">{description}</small>
      </FormGroup>
    );
  }
   renderDropdown(label, name, options, icon, description) {
    return (
      <FormGroup>
        <label>{label}</label>
        <InputGroup className="input-group-alternative">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className={icon} />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            type="select"
            name={name}
            value={this.state[name]}
            onChange={this.handleInputChange}
          >
            <option value="">{`Sélectionnez ${label.toLowerCase()}`}</option>
            {Array.isArray(options) && options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </Input>
        </InputGroup>
        <small className="text-muted">{description}</small>
      </FormGroup>
    );
  }
}

export default Recomandation;
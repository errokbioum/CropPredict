import React from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import { API_BASE_URL } from "config/api";
import "./Prédiction.css";

import stateData from "./state.json";
import cropsData from './crop.json';

const seasons = ["Summer", "Kharif", "Autumn", "Rabi", "Annual"];

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

class Prédiction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      area: "",
      crop: "",
      city: "",
      season: "",
      responseMessage: "",
      predictionId: null,
      email: "",
      chartData: null,
      isLoading: false,
      isEmailSending: false,
      emailMessage: "",
      humidity: "",
      rainfall: "",
      temperature: "",
      predictionResult: "",
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
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });

    const jwtToken = localStorage.getItem("jwt");
    if (!jwtToken) {
      alert("Aucun jeton JWT trouvé. Veuillez vous connecter.");
      return;
    }

    try {
      const { area, crop, city, season } = this.state;
      const userData = { area: parseFloat(area), crop, city, season };

      const response = await axios.post(
        `${API_BASE_URL}/api/predictions/predict`,
        { formdata: userData },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      this.setState({ humidity : response.data.result.humidity})
      this.setState({ temperature : response.data.result.temperature})
      this.setState({ rainfall : response.data.result.rainfall})
      this.setState({ predictionResult : response.data.result.prediction.toFixed(2)})
      


      const yearYieldData = response.data.result.year_yield;
      const yearsData = Object.values(yearYieldData);
      const years = Object.keys(yearYieldData);

      this.setState({
        chartData: {
          labels: years,
          datasets: [
            {
              label: "Yearly Yield",
              data: yearsData,
              backgroundColor: "rgba(255, 159, 64, 0.6)",
              borderColor: "rgba(255, 159, 64, 1)",
              borderWidth: 1,
            },
          ],
        },
        predictionId: response.data.id,
        isLoading: false,
      });
    } catch (error) {
      console.error("Erreur:", error);
      this.setState({ isLoading: false });
      alert("Échec de la récupération de la prédiction. Veuillez réessayer.");
    }
  };

  handleEmailSubmit = async () => {
    const { email, predictionId } = this.state;

    if (!email) {
      alert("Veuillez entrer une adresse e-mail.");
      return;
    }

    const jwtToken = localStorage.getItem("jwt");
    if (!jwtToken) {
      alert("Aucun jeton JWT trouvé. Veuillez vous connecter.");
      return;
    }

    this.setState({ isEmailSending: true });

    try {
      await axios.post(
        `${API_BASE_URL}/api/emails/send-prediction/${predictionId}`,
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
        emailMessage: "E-mail envoyé avec succès !",
      });
    } catch (error) {
      console.error("Erreur d'envoi d'e-mail:", error);
      this.setState({
        isEmailSending: false,
        emailMessage: "Échec de l'envoi de l'e-mail. Veuillez réessayer.",
      });
    }
  };

  renderGraph = () => {
    const { chartData } = this.state;

    if (!chartData) return null;

    return (
      <Bar
        data={chartData}
        options={{
          scales: {
            y: {
              beginAtZero: true,
              max: Math.max(...chartData.datasets[0].data) + 1,
            },
          },
        }}
      />
    );
  };

  render() {
    const {
      area,
      crop,
      city,
      season,
      isLoading,
      isEmailSending,
      email,
      emailMessage,
      humidity,
      temperature,
      rainfall,
      predictionResult,
      state,
      chartData,
    } = this.state;
    const cropss = cropsData.crops; 
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
                        <h2 className="text-orange">Prédiction de Récolte</h2>
                      </div>
                      <div className="text-center">
                        <p>Utilisez ce formulaire pour obtenir une prédiction de récolte basée sur les conditions de votre terrain et les données météorologiques.</p>
                      </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                      <Form role="form" onSubmit={this.handleSubmit}>
                        <Row>
                          <Col md="6">
                            {this.renderFormGroup("Surface en hectares", "area", "number", area, "ni ni-ruler-pencil", "Entrez la superficie de votre terrain en hectares.")}
                            {this.renderDropdown("État", "state", Object.keys(stateData), "ni ni-map-big", "Sélectionnez votre état .")}
                          {this.renderDropdown("Saison", "season", seasons, "ni ni-calendar-grid-58", "Sélectionnez la saison de plantation pour votre cas.")}
                           {this.renderFormGroup("Humidité (%)", "humidity", "text", humidity, "ni ni-world-2", "Le taux d'humidité moyen prévu pour votre région.", true)} 
                          </Col>
                          <Col md="6"> 
                            {this.renderDropdown("Culture", "crop", cropss, "ni ni-planet", "Sélectionnez le type de culture que vous souhaitez.")}
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
                  {predictionResult && (
                    <Card className="bg-secondary shadow border-0 mt-5">
                      <CardHeader className="bg-white pb-5">
                        <div className="text-muted text-center mb-3">
                          <h2 className="text-orange">Résultats de la Prédiction</h2>
                        </div>
                      </CardHeader>
                      <CardBody className="px-lg-5 py-lg-5">
                        <h4 className="text-center mb-4">Prédiction de récolte : {predictionResult} kg</h4>
                        {this.renderGraph()}
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
            <div className="loading-text">Récupération de la prédiction...</div>
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

export default Prédiction;


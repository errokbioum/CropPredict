import React from "react";
import axios from "axios"; 
import "./Profile.css"

import { Card, Container, Row, Col } from "reactstrap";
import { AuthContext } from "../../views/IndexSections/AuthContext";
import { API_BASE_URL } from "config/api";


import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import TabsSection from "views/IndexSections/Tabs";

class Profile extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      predictions: [],  
      recommendations: [], 
      user : null, 
      error: null,
      
    };
  }
  
  componentDidMount() {
    const { user } = this.context;
    if (user) {
      this.setState({ user });
      console.log("----------->", user);
    }
      
  
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;

    
    this.fetchUserData();
  }

 

  
  fetchUserData = async () => {
    try {
      
      const jwt = localStorage.getItem("jwt");
  
      
      if (!jwt) {
        throw new Error("No JWT token found. Please log in again.");
      }
  
     
      const headers = {
        Authorization: `Bearer ${jwt}`,
      };
  
      
      const predictionResponse = await axios.get(`${API_BASE_URL}/api/predictions/my-predictions`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`, 
        }});
      const recommendationResponse = await axios.get(`${API_BASE_URL}/api/recommendations/my-recommendations`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`, 
        }});
  
      console.log("Prédictions:", predictionResponse.data);
      console.log("Recommandations:", recommendationResponse.data);
      console.log("--------->", this.state.profileUser)
      
  
      
      this.setState({
        predictions: predictionResponse.data,
        recommendations: recommendationResponse.data,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
      this.setState({
        error: "Impossible de récupérer les données. Veuillez réessayer plus tard.",
      });
    }
  };


 
  
  
  

  
  
  

  render() {
    const { predictions, recommendations, user, error } = this.state;

    return (
      <>
        <DemoNavbar />
        <main className="profile-page" ref="main">
          <section className="section-profile-cover section-shaped my-0">
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
            <div className="separator separator-bottom separator-skew">
              <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                <polygon className="fill-white" points="2560 0 2560 100 0 100" />
              </svg>
            </div>
          </section>
          <section className="section">
          <Container>
      <Card className="card-profile shadow mt--300">
        <div className="px-4">
          <Row className="justify-content-center">
            <Col className="order-lg-2" lg="3">
              <div className="card-profile-image">
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <img alt="..." className="rounded-circle .custom-z-index" src={require("assets/img/theme/user.png")} />
                </a>
              </div>
            </Col>
            <Col className="order-lg-3 text-lg-right align-self-lg-center" lg="4">
              <div className="card-profile-actions py-4 mt-lg-0"></div>
            </Col>
            <Col className="order-lg-1" lg="4">
              <div className="card-profile-stats d-flex justify-content-center">
                <div>
                  <span className="heading">.</span>
                  <span className="description"></span>
                </div>
                <div>
                  <span className="heading"></span>
                  <span className="description"></span>
                </div>
                <div>
                  <span className="heading"></span>
                  <span className="description"></span>
                </div>
              </div>
            </Col>
          </Row>
          <div className="text-center mt-5">
            <h3>
              {this.state.user?.username} <span className="font-weight-light">, 27</span>
            </h3>
            <div className="h6 font-weight-300">
              <i className="ni location_pin mr-2" />
              {this.state.user?.email}
            </div>
            
            <div>
              <i className="ni education_hat mr-2" />

              Consulter tous vos prédictions et recommendations dès maintenant !
            </div>
          </div>
          <div className="mt-5 py-5 border-top text-center">
            {error ? (
              <div className="alert alert-danger">{error}</div>
            ) : (
              <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                <TabsSection predictions={predictions} recommendations={recommendations} />
                
              </div>
            )}
          </div>
        </div>
      </Card>
    </Container>
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default Profile;




import React, { useState, useContext } from "react";
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Container, Row, Col } from "reactstrap";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../views/IndexSections/AuthContext";
import { API_BASE_URL } from "config/api";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    if (email && password) {
      try {
        
        const { data } = await axios.post(`${API_BASE_URL}/auth/signing`, {
          email, 
          password,
        });

        if (data.jwt) {
          localStorage.setItem("jwt", data.jwt);
          console.log("Login successful", data);
          navigate("/"); 
        }
  
        const user = data;
        login(user);
      } catch (err) {
       
        setError("Email or password is incorrect.");
        console.error("Login error", err);
      }
    } else {
      alert("Please enter your email and password.");
    }
  }

  
  
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value); 
    } else if (name === "password") {
      setPassword(value); 
    }
  };

  return (
    <>
      <DemoNavbar />
      <main>
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
              <Col lg="5">
                <Card className="bg-secondary shadow border-0">
                  <CardHeader className="bg-white pb-5">
                    <div className="text-muted text-center mb-3">
                      <small>Sign in</small>
                    </div>
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                      {error && <div className="text-danger">{error}</div>}
                    </div>
                    <Form role="form">
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Email"
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleInputChange}
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-lock-circle-open" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleInputChange}
                            autoComplete="off"
                          />
                        </InputGroup>
                      </FormGroup>
                     
                      <div className="text-center">
                        <Button className="my-4" color="success" type="button" onClick={handleLogin}>
                          Sign in
                        </Button>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
                <Row className="mt-3">
                
                  <Col className="text-right" xs="6">
                    <a className="text-light" href="#pablo" onClick={(e) => e.preventDefault()}>
                      <Link to="/register">
                        <small>Create new account</small>
                      </Link>
                    </a>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
      <SimpleFooter />
    </>
  );
};

export default Login;





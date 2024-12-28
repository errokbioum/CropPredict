import React from "react";
import { Button, Card, CardHeader, CardBody, FormGroup, Form, InputGroupAddon, InputGroupText, InputGroup, Container, Row, Col, Input } from "reactstrap";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import { registerUser } from "../../Api"; 

class Register extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      username: '',
      email: '',
      password: '',
      usernameError: '',
      emailError: '',
      passwordError: '',
      generalError: ''
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  Register = async (e) => {
    e.preventDefault();
    const { fullName, username, email, password } = this.state;
    const userData = { fullName, username, email, password };
    
    try {
      await registerUser(userData);  
      window.location = "/"; // Redirect to homepage after successful registration
    } catch (error) {
      if (error.response) {
        // Reset all error messages
        this.setState({
          usernameError: '',
          emailError: '',
          passwordError: '',
          generalError: ''
        });

        // Handle specific errors for each field
        if (error.response.data.errors) {
          const errors = error.response.data.errors;
          
          if (errors.username) {
            this.setState({ usernameError: errors.username });
          }
          if (errors.email) {
            this.setState({ emailError: errors.email });
          }
          if (errors.password) {
            this.setState({ passwordError: errors.password });
          }
        } else {
          // General error (e.g., network or unexpected error)
          this.setState({ generalError: error.response.data.msg || 'An unexpected error occurred. Please try again.' });
        }
      } else {
        this.setState({ generalError: 'An unexpected error occurred. Please try again.' });
      }
    }
  };

  render() {
    const { fullName, username, email, password, usernameError, emailError, passwordError, generalError } = this.state;
    return (
      <React.Fragment>
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
                <Col lg="5">
                  <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-white pb-5">
                      <div className="text-muted text-center mb-3">
                        <small>Sign up with</small>
                      </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                      <div className="text-center text-muted mb-4">
                        <small>Or sign up with credentials</small>
                      </div>
                      <Form role="form" onSubmit={this.Register}>
                        {/* Display general error */}
                        {generalError && (
                          <div className="alert alert-danger">
                            {generalError}
                          </div>
                        )}
                        
                        {/* Full Name Field */}
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-hat-3" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Full Name"
                              type="text"
                              name="fullName"
                              value={fullName}
                              onChange={this.handleInputChange}
                              required
                            />
                          </InputGroup>
                        </FormGroup>
                        
                        {/* Username Field */}
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-hat-3" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Username"
                              type="text"
                              name="username"
                              value={username}
                              onChange={this.handleInputChange}
                              required
                            />
                          </InputGroup>
                          {/* Display username error */}
                          {usernameError && (
                            <div className="alert alert-danger">
                              {usernameError}
                            </div>
                          )}
                        </FormGroup>
                        
                        {/* Email Field */}
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
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
                              onChange={this.handleInputChange}
                              required
                            />
                          </InputGroup>
                          {/* Display email error */}
                          {emailError && (
                            <div className="alert alert-danger">
                              {emailError}
                            </div>
                          )}
                        </FormGroup>
                        
                        {/* Password Field */}
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
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
                              onChange={this.handleInputChange}
                              required
                            />
                          </InputGroup>
                          {/* Display password error */}
                          {passwordError && (
                            <div className="alert alert-danger">
                              {passwordError}
                            </div>
                          )}
                        </FormGroup>
                        
                        <div className="text-center">
                          <Button className="mt-4" color="primary" type="submit">
                            Create account
                          </Button>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
        <SimpleFooter />
      </React.Fragment>
    );
  }
}

export default Register;

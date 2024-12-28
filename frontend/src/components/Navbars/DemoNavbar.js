import React from "react"; 
import { Link } from "react-router-dom";
import Headroom from "headroom.js";
import { AuthContext } from "../../views/IndexSections/AuthContext";
import "./Navbar.css"
import {
  Button,
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

class DemoNavbar extends React.Component {
  static contextType = AuthContext;

  componentDidMount() {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    headroom.init();
  }

  state = {
    collapseClasses: "",
    collapseOpen: false,
  };

  onExiting = () => {
    this.setState({
      collapseClasses: "collapsing-out",
    });
  };

  onExited = () => {
    this.setState({
      collapseClasses: "",
    });
  };

  render() {
    const { isLoggedIn, logout} = this.context;

    var username = "Unkonwn";

    if(isLoggedIn)
    {
      username = this.context.user?.username;
    }
     
    
    return (
      <header className="header-global">
        <Navbar
          className="navbar-main navbar-transparent navbar-light headroom"
          expand="lg"
          id="navbar-main"
        >
          <Container>
            <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
            <div className="navbar-logo">
            
            <span className="logo-text">CROPREDICT</span>


            </div>
            </NavbarBrand>
            <button className="navbar-toggler" id="navbar_global">
              <span className="navbar-toggler-icon" />
            </button>
            <UncontrolledCollapse
              toggler="#navbar_global"
              navbar
              className={this.state.collapseClasses}
              onExiting={this.onExiting}
              onExited={this.onExited}
            >
              <div className="navbar-collapse-header">
                <Row>
                  <Col className="collapse-brand" xs="6">
                    <Link to="/">
                      <img alt="..." src={require("assets/img/brand/argon-react.png")} />
                    </Link>
                  </Col>
                  <Col className="collapse-close" xs="6">
                    <button className="navbar-toggler" id="navbar_global">
                      <span />
                      <span />
                    </button>
                  </Col>
                </Row>
              </div>
              <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                <NavItem>
                  <NavLink to="/" tag={Link}>
                    <i className="fa fa-home" /> Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/AboutUs" tag={Link}>
                    About us
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav className="align-items-lg-center ml-lg-auto" navbar>
                {isLoggedIn ? (
                  <>
                    <NavItem>
                      <NavLink to="/profile-page" tag={Link}>
                        <i className="fa fa-user-circle" /> {username}
                      </NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink
  to="/"
  tag={Link}
  onClick={(e) => {
    e.preventDefault(); // Empêche la navigation par défaut
    logout(); // Déconnecte l'utilisateur
    this.forceUpdate(); // Met à jour immédiatement la navbar
    setTimeout(() => window.location.reload(), 0); // Recharge la page rapidement
  }}
>
  <i className="fa fa-sign-out" /> Se déconnecter
</NavLink>

                    </NavItem>
                  </>
                ) : (
                  <NavItem>
                    <NavLink to="/login-page" tag={Link}>
                      <i className="fa fa-sign-in" /> S'identifier
                    </NavLink>
                  </NavItem>
                )}
              </Nav>
            </UncontrolledCollapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}

export default DemoNavbar;

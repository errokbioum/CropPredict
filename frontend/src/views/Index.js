import React from "react";

// Composants internes
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import Carousel from "./IndexSections/Carousel.js";
import Carousel2 from "./IndexSections/Carousel2.js";
import Download from "./IndexSections/Download.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import Landing from "./examples/Landing.js";
import Home from "./IndexSections/Home.js";

// Contexte Auth
import { AuthProvider } from "../views/IndexSections/AuthContext.js"; 

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.mainRef = React.createRef(); // Utilisation de createRef
  }

  componentDidMount() {
    // Réinitialiser la position du scroll lorsque le composant est monté
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.mainRef.current.scrollTop = 0; // Accès à la référence avec .current
  }

  render() {
    return (
      <AuthProvider>
        <>
          <DemoNavbar />
          <main ref={this.mainRef}> {/* Utilisation de la référence avec createRef */}
            <Home />
            <Carousel />
            <Carousel2 />
            <Download />
            <Landing />
          </main>
          <SimpleFooter />
        </>
      </AuthProvider>
    );
  }
}

export default Index;

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// Importation de vos composants
import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";

import Index from "views/Index.js";
import Landing from "views/examples/Landing.js";
import Login from "views/examples/Login.js";
import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";
import Prédiction from "views/IndexSections/Prédiction";
import AboutUs from "views/IndexSections/AboutUs";
import Recomandation from "views/IndexSections/Recomandation";
import Typography from "views/IndexSections/Typography";
import { AuthProvider, AuthContext } from "views/IndexSections/AuthContext.js";  // Importer le contexte

const root = ReactDOM.createRoot(document.getElementById("root"));

function ProtectedRoute({ element, ...rest }) {
  return (
    <AuthContext.Consumer>
      {({ isLoggedIn }) =>
        isLoggedIn ? (
          element
        ) : (
          <Navigate to="/login-page" replace />
        )
      }
    </AuthContext.Consumer>
  );
}

root.render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Index />} />
        <Route path="/landing-page" exact element={<Landing />} />
        <Route path="/login-page" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/AboutUs" exact element={<AboutUs />}  />
        <Route path="/Typo" exact element={<Typography />} />

        
        <Route path="/profile-page" element={<ProtectedRoute element={<Profile />} />} />
        <Route path="/Prédiction" element={<ProtectedRoute element={<Prédiction />} />} />
        
        <Route path="/Recomandation" element={<ProtectedRoute element={<Recomandation />} />} />
        

        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

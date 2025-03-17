﻿import React from 'react';
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="footer text-center py-4">
          <p>&copy; 2025 Estude em Movimento. All Rights Reserved.</p>
          <hr></hr>
          <p>Entre em Contato</p>
          
          <Link to="/contactUs" style={{ color: "white", textDecoration: "none" }}>
              Nos contate
          </Link>
          <hr></hr>
       
          <Link to="/SpacedLearningPage" style={{ color: "white", textDecoration: "none" }}>
              Sobre nós
          </Link>
          <p>Termos de Uso</p>
  
    </footer>
  );
};



export default Footer;

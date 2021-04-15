// Global Imports
import React from "react";

import FooterStyles from '../styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={FooterStyles.FooterContainer}>
      <p className={FooterStyles.FooterText}>Copyright &copy; {new Date().getFullYear()}. Created by <a href="https://juangarcia.design" className={FooterStyles.FooterLink}>JMG</a>. Pod&eacute;s revisar las reglas del chinch&oacute;n <a href="https://www.mundijuegos.com.ar/multijugador/chinchon/reglas/" className={FooterStyles.FooterLink}>ac&aacute;.</a></p>
    </footer>
  );
};

export default Footer;
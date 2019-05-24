import React, { Component } from 'react';
import Game from './Game';
import './Pexeso.css';

const Header = () => {
  return (
    <div className="header">Pexeso</div>
  );
}
const Footer = () => {
  return (
    <div className="footer">
       Cats courtesy of <a href="https://thecatapi.com/">TheCatAPI - Cats as a Service, Everyday is Caturday.</a>
    </div>
  );
}
class Pexeso extends Component {
  render() {
    return (
      <div className="Pexeso">
        <Header />
        <Game />
        <Footer />
      </div>
    );
  }
}

export default Pexeso;

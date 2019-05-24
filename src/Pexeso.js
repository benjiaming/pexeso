import React, { Component } from 'react';
import Game from './Game';
import './Pexeso.css';

const Header = () => {
  const cat = <span role="img" aria-label="cat">🐱</span>;
  return (
    <div className="header">{cat} Pexeso {cat}</div>
  );
}
const Footer = () => {
  return (
    <div className="footer">
       Cats provided by <a href="https://thecatapi.com/">TheCatAPI - Cats as a Service</a>, Everyday is Caturday.
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

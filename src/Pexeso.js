import React, { Component } from "react";

import Game from "./Game";
import { CatDeck, DogDeck } from "./Deck";

import "./Pexeso.css";

const Header = ({ deck, settings }) => {
  const icon = (
    <span role="img" aria-label="icon">
      {deck.icon}
    </span>
  );
  return (
    <div className="header">
      <span className="header-icons">
        {icon} Pexeso {icon}
      </span>
      <span>
        <i className="settings fas fa-cogs" onClick={settings} />
      </span>
    </div>
  );
};
const Footer = ({ deck }) => {
  return <div className="footer">{deck.footerMsg}</div>;
};
class Pexeso extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: CatDeck
    };
    this.settings = this.settings.bind(this);
  }
  settings() {
    let newDeck = CatDeck;
    if (this.state.deck.id === "cat") newDeck = DogDeck;
    this.setState({ deck: newDeck });
  }
  render() {
    return (
      <div className="Pexeso">
        <Header deck={this.state.deck} settings={this.settings} />
        <Game deck={this.state.deck} />
        <Footer deck={this.state.deck} />
      </div>
    );
  }
}

export default Pexeso;

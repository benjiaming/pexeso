import React, { Component } from "react"

import Game from "./Game"
import { CatDeck, DogDeck, ChineseDeck, HiraganaDeck } from "./Deck"

import "./Pexeso.css"

const allGames = {
  cat: CatDeck,
  dog: DogDeck,
  chinese: ChineseDeck,
  hiragana: HiraganaDeck,
}
const nextGame = {
  cat: DogDeck,
  dog: ChineseDeck,
  chinese: HiraganaDeck,
  hiragana: CatDeck,
}

const Header = ({ deck, settings }) => {
  const icon = (
    <span role="img" aria-label="icon">
      {deck.icon}
    </span>
  )
  return (
    <div className="header">
      <span className="header-icons">
        {icon} Pexeso {icon}
      </span>
      <span>
        <i className="settings fas fa-cogs" onClick={settings} />
      </span>
    </div>
  )
}
const Footer = ({ deck }) => {
  return <div className="footer">{deck.footerMsg}</div>
}
class Pexeso extends Component {
  constructor(props) {
    super(props)
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    let selectedDeck = ChineseDeck
    if (urlParams.has("deck")) {
      selectedDeck = allGames[urlParams.get("deck")]
    }

    this.state = {
      deck: selectedDeck,
    }
    this.settings = this.settings.bind(this)
    this.changeFooter = this.changeFooter.bind(this)
  }
  settings() {
    const newDeck = nextGame[this.state.deck.id] || ChineseDeck
    this.setState({ deck: newDeck })
  }
  changeFooter(newMessage) {
    const newDeck = this.state.deck
    newDeck.footerMsg = newMessage
    this.setState({ deck: newDeck })
  }
  render() {
    return (
      <div className="Pexeso">
        <Header deck={this.state.deck} settings={this.settings} />
        <Game deck={this.state.deck} changeFooter={this.changeFooter} />
        <Footer deck={this.state.deck} />
        <canvas id="canvas" width="150px" height="150px" />
      </div>
    )
  }
}

export default Pexeso

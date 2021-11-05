import React, { Component } from "react"
import BoxList from "./BoxList"

const GameOver = ({ img, deck, onClick, score }) => {
  if (img.alt) {
    console.log(img.alt)
  }
  return (
    <div className="game-over">
      <p>Do you still remember this card?</p>
      <div />
      <img
        className="slide-fwd-center"
        src={img.image}
        width="300px"
        alt="box"
        style={{
          margin: "20px",
          borderRadius: "10px",
          boxShadow: "-10px 10px 10px black",
        }}
      />
      <div>Score: {score}</div>
      <button onClick={onClick}>{deck.tryAgainMsg}</button>
    </div>
  )
}
class Game extends Component {
  constructor(props) {
    super(props)
    this.rowLen = 4 //even number
    this.synth = window.speechSynthesis
    this.state = {
      squares: this.createSquares(),
      loaded: false,
      images: [],
      paused: false,
      numTries: 0,
      score: 0,
      previousPhrase: "",
      originalFooter: this.props.deck.footerMsg
    }
    this.onClick = this.onClick.bind(this)
    this.loadGame = this.loadGame.bind(this)
  }
  componentDidUpdate(prevProps) {
    if (prevProps.deck.id !== this.props.deck.id) {
      this.loadGame()
    }
  }
  componentDidMount() {
    this.loadGame()
  }
  loadGame() {
    this.generateCards(this.rowLen ** 2 / 2, this.props.deck)
    this.setState({ numTries: 0 })
    this.props.changeFooter(this.state.originalFooter)

  }
  createSquares() {
    return [...Array(this.rowLen ** 2)].fill({})
  }
  getRandomPosition(arr) {
    return Math.floor(Math.random() * arr.length)
  }
  newSquare(src, text) {
    return {
      image: src,
      shown: false,
      guessed: false,
      alt: text,
    }
  }
  initSquares(num) {
    const squares = [...this.state.squares]
    const images = [...this.state.images]
    for (let i = 0; i < squares.length; i++) {
      const image = images.pop()
      squares[i] = this.newSquare(image.src, image.alt)
    }
    this.setState({ squares, loaded: true })
  }
  generateCards(num, deck) {
    try {
      this.setState({ loaded: false }, async () => {
        const images = await deck.generateCards(num, deck)
        this.setState({ images }, () => {
          this.initSquares(this.rowLen)
          this.setState({ loaded: true })
        })
      })
    } catch (err) {
      console.log(err)
      this.setState({ crashed: true })
    }
  }

  otherSquareId(square, id, squares) {
    let otherSquareId
    squares.forEach((s, sid) => {
      if (id !== sid && s.image === square.image && s.shown) {
        otherSquareId = sid
        return
      }
    })
    return otherSquareId
  }
  isGuessingSecond(squares) {
    const numShown = squares.reduce((ac, s) => {
      if (s.shown && !s.guessed) {
        ac++
      }
      return ac
    }, 0)
    return numShown % 2 === 0
  }
  hideAllSquares() {
    const squares = [...this.state.squares]
    this.state.squares.forEach((s, i) => {
      if (s.shown) {
        const newSquare = { ...s }
        newSquare.shown = false
        squares[i] = newSquare
      }
    })
    this.setState({ paused: true }, () => {
      setTimeout(() => {
        this.setState({ paused: false, squares })
      }, 5000)
    })
  }
  checkOtherSquareId(selectedSquare, id, squares) {
    const otherSquareId = this.otherSquareId(selectedSquare, id, squares)
    if (otherSquareId === undefined) {
      this.hideAllSquares()
      this.setState((state) => {
        return { score: Math.max(state.score - 1, 0) }
      })
      return
    }
    this.setState((state) => {
      return { score: state.score + 10 }
    })
    this.disableSelectedSquares(selectedSquare, squares, otherSquareId)
  }
  disableSelectedSquares(selectedSquare, squares, otherSquareId) {
    this.setState({ paused: true }, () => {
      setTimeout(() => {
        selectedSquare.guessed = true
        const otherSquare = { ...squares[otherSquareId] }
        otherSquare.guessed = true
        squares[otherSquareId] = otherSquare
        this.setState({ paused: false, squares })
      }, 5000)
    })
  }
  isOver() {
    if (!this.state.loaded) {
      return false
    }
    return this.state.squares.every((square) => square.guessed)
  }
  onClick(square, id) {
    if (this.state.paused) {
      return
    }
    const squares = [...this.state.squares]
    const selectedSquare = { ...squares[id] }
    if (selectedSquare.alt) {
      console.log(selectedSquare.alt)
      this.props.changeFooter(selectedSquare.alt)
      clearInterval(this.interval)
      this.interval = setTimeout(() => {
        this.props.changeFooter('')
      }, 1000)
    }
    selectedSquare.shown = !selectedSquare.shown
    squares[id] = selectedSquare
    if (selectedSquare.alt && this.synth) {
      const pronunciation = selectedSquare.alt.split(":")[0]
        const utterThis = new SpeechSynthesisUtterance(pronunciation)
        const langTable = {
          "chinese": "zh-CN",
          "hiragana": "ja-JP",
        }
        utterThis.lang = langTable[this.props.deck.id]
        if (utterThis.lang && this.state.previousPhrase !== pronunciation) {
          this.synth.speak(utterThis)
        }
        this.setState({ previousPhrase: pronunciation })
    }
    this.setState({ squares }, () => {
      if (this.isGuessingSecond(squares)) {
        this.setState(
          (prevState) => {
            prevState.numTries = prevState.numTries + 1
          },
          () => {
            this.checkOtherSquareId(selectedSquare, id, squares)
          }
        )
      }
    })
  }

  render() {
    if (this.isOver()) {
      return (
        <GameOver
          img={this.state.squares[this.getRandomPosition(this.state.squares)]}
          deck={this.props.deck}
          onClick={this.loadGame}
          score={this.state.score}
        />
      )
    }
    return (
      <div className="game">
        {this.state.loaded ? (
          <div>
            <BoxList
              rowLen={this.rowLen}
              loaded={this.state.loaded}
              squares={this.state.squares}
              onClick={this.onClick}
              theme={this.props.deck.theme}
            />
            <div>Attempts: {this.state.numTries}</div>
            <div>Score: {this.state.score}</div>
          </div>
        ) : this.state.crashed ? (
          <div>{this.props.deck.crashedMsg}</div>
        ) : (
          <div>{this.props.deck.loadingMsg}</div>
        )}
      </div>
    )
  }
}

export default Game

import React, { Component } from "react";
import BoxList from "./BoxList";

const GameOver = ({ img, deck, onClick }) => {
  return (
    <div className="game-over">
      <div />
      <img
        className="flip-vertical-right"
        src={img}
        width="300px"
        alt="box"
        style={{
          margin: "20px",
          borderRadius: "10px",
          boxShadow: "-10px 10px 10px black"
        }}
      />
      <button onClick={onClick}>{deck.tryAgainMsg}</button>
    </div>
  );
};
class Game extends Component {
  constructor(props) {
    super(props);
    this.rowLen = 2; //even number
    this.state = {
      squares: this.createSquares(),
      loaded: false,
      images: [],
      paused: false,
      numTries: 0
    };
    this.onClick = this.onClick.bind(this);
    this.loadGame = this.loadGame.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.deck.id !== this.props.deck.id) {
      this.loadGame();
    }
  }
  componentDidMount() {
    this.loadGame();
  }
  loadGame() {
    this.preloadImages(this.rowLen ** 2 / 2, this.props.deck);
    this.setState({ numTries: 0 });
  }
  createSquares() {
    return [...Array(this.rowLen ** 2)].fill({});
  }
  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  getRandomPosition(arr) {
    return Math.floor(Math.random() * arr.length);
  }
  newSquare(src) {
    return {
      image: src,
      shown: false,
      guessed: false
    };
  }
  initSquares(num) {
    const squares = [...this.state.squares];
    const images = [...this.state.images, ...this.state.images];
    this.shuffle(images);
    this.setState({ images }, () => {
      for (let i = 0; i < squares.length; i++) {
        squares[i] = this.newSquare(images.pop().src);
      }
      this.setState({ squares, loaded: true });
    });
  }
  async preloadImages(num, deck) {
    try {
      const images = await deck.preloadImages(num);
      this.setState({ images }, () => {
        this.initSquares(this.rowLen);
      });
    } catch (err) {
      console.log(err);
      this.setState({ crashed: true });
    }
  }

  otherSquareId(square, id, squares) {
    let otherSquareId;
    squares.forEach((s, sid) => {
      if (id !== sid && s.image === square.image && s.shown) {
        otherSquareId = sid;
        return;
      }
    });
    return otherSquareId;
  }
  isGuessingSecond(squares) {
    const numShown = squares.reduce((ac, s) => {
      if (s.shown && !s.guessed) {
        ac++;
      }
      return ac;
    }, 0);
    return numShown % 2 === 0;
  }
  hideAllSquares() {
    const squares = [...this.state.squares];
    this.state.squares.forEach((s, i) => {
      if (s.shown) {
        const newSquare = { ...s };
        newSquare.shown = false;
        squares[i] = newSquare;
      }
    });
    this.setState({ paused: true }, () => {
      setTimeout(() => {
        this.setState({ paused: false, squares });
      }, 1000);
    });
  }
  checkOtherSquareId(selectedSquare, id, squares) {
    const otherSquareId = this.otherSquareId(selectedSquare, id, squares);
    if (otherSquareId === undefined) {
      this.hideAllSquares();
      return;
    }
    this.disableSelectedSquares(selectedSquare, squares, otherSquareId);
  }
  disableSelectedSquares(selectedSquare, squares, otherSquareId) {
    this.setState({ paused: true }, () => {
      setTimeout(() => {
        selectedSquare.guessed = true;
        const otherSquare = { ...squares[otherSquareId] };
        otherSquare.guessed = true;
        squares[otherSquareId] = otherSquare;
        this.setState({ paused: false, squares });
      }, 500);
    });
  }
  isOver() {
    if (!this.state.loaded) {
      return false;
    }
    return this.state.squares.every(square => square.guessed);
  }
  onClick(square, id) {
    if (this.state.paused) {
      return;
    }
    const squares = [...this.state.squares];
    const selectedSquare = { ...squares[id] };
    selectedSquare.shown = !selectedSquare.shown;
    squares[id] = selectedSquare;
    this.setState({ squares }, () => {
      if (this.isGuessingSecond(squares)) {
        this.setState(
          prevState => {
            prevState.numTries = prevState.numTries + 1;
          },
          () => {
            this.checkOtherSquareId(selectedSquare, id, squares);
          }
        );
      }
    });
  }

  render() {
    if (this.isOver()) {
      return (
        <GameOver
          img={
            this.state.squares[this.getRandomPosition(this.state.squares)].image
          }
          deck={this.props.deck}
          onClick={this.loadGame}
        />
      );
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
            />
            <div>Attempts: {this.state.numTries}</div>
          </div>
        ) : this.state.crashed ? (
          <div>{this.props.deck.crashedMsg}</div>
        ) : (
          <div>{this.props.deck.loadingMsg}</div>
        )}
      </div>
    );
  }
}

export default Game;

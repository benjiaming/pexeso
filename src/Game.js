import React, { Component } from 'react';
import $ from "jquery";
import BoxList from './BoxList';

const GameOver = ({img}) => {
    return (
        <div className="game-over">
            <div>Purrrr! Nicely done!!  Meow!!!</div>
            <img 
                className="flip-vertical-right" 
                src={img} width="300px" 
                alt="cat" 
                style={{margin: "20px", borderRadius: "10px", boxShadow: "-10px 10px 10px black"}}
            />
            <button onClick={() => window.location.reload() }>Trrrrry again?</button>
        </div>
    )
}
class Game extends Component {
    constructor(props) {
        super(props);
        this.rowLen = 4; //even number
        this.state = {
            squares: this.createSquares(),
            loaded: false,
            cats: [],
            paused: false,
            numTries: 0,
        };
        this.onClick = this.onClick.bind(this);
    }
    componentDidMount() {
        this.preloadImages((this.rowLen ** 2)/ 2);
    }
    createSquares() {
        return [...Array(this.rowLen ** 2)].fill({});
    }
    getRandomPosition(arr) {
        return Math.floor(Math.random()*arr.length);
    }
    getNextSquarePosition(squares) {
        let position;
        do {
            position = this.getRandomPosition(squares);
        } while (!$.isEmptyObject(squares[position]));
        return position;
    }
    newSquare(src) {
        return {
            image: src,
            shown: false,
            guessed: false,
        }
    }
    initSquares(num) {
        const squares = [...this.state.squares];
        this.state.cats.forEach(cat => {
            let position = this.getNextSquarePosition(squares);
            squares[position] = this.newSquare(cat.src);
            position = this.getNextSquarePosition(squares);
            squares[position] = this.newSquare(cat.src); 
        });
        this.setState({squares, loaded: true})
    }
    async preloadImages(num) {
        const url = 'https://api.thecatapi.com/v1/images/search?size=full';
        const promises = [...Array(num)].fill().map(i => $.getJSON(url));
        const results = await Promise.all(promises);
        const cats = results.map(r => {
            const image = new Image();
            image.src = r[0].url;
            return image;
        });
        this.setState({cats}, () => { this.initSquares(this.rowLen) });
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
            const newSquare = {...s};
            newSquare.shown = false;
            squares[i] = newSquare;
        }
        });
        this.setState({paused: true}, () => {
            setTimeout(() => {this.setState({paused: false, squares})}, 1000);
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
        const selectedSquare = {...squares[id]};
        selectedSquare.shown = !selectedSquare.shown;
        squares[id] = selectedSquare;  
        this.setState({squares}, () => {     
            if (this.isGuessingSecond(squares)) {
                this.setState(prevState => {
                    prevState.numTries = prevState.numTries+1
                }, () => {
                    this.checkOtherSquareId(selectedSquare, id, squares);
                });
            }
        });
    }

    render() {
        if (this.isOver()) {
            return <GameOver 
                img={this.state.squares[this.getRandomPosition(this.state.squares)].image}
            />
        }
        return (
            <div className="game">
            {this.state.loaded ?
                <div>
                    <BoxList 
                        rowLen={this.rowLen} 
                        loaded={this.state.loaded} 
                        squares={this.state.squares} 
                        onClick={this.onClick}
                    />
                    <div>Attempts: {this.state.numTries}</div>
                </div>
                : <div>Herding cats. Please wait...</div>}
            </div>
        );
    }
}

export default Game;
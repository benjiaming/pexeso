import React from 'react';
import ReactDOM from 'react-dom';
import Pexeso from './Pexeso';
import Game from './Game';

const Counter = (arr) => {
  return arr.reduce((ac, img) => {
    const num = ac.get(img);
    if (num === undefined) {
      ac.set(img, 1);
    } else {
      ac.set(img, num+1);
    }
    return ac;
  }, new Map());
};

describe('Pexeso', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Pexeso />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('creates and inits squares', () => {
    const game = new Game();
    game.rowLen = 6;
    const squares = game.createSquares();
    expect(squares.length).toEqual(game.rowLen ** 2);
    const numImages = (game.rowLen ** 2)/2;
    expect(numImages).toEqual(18);
    const imagesList = [...Array(numImages)].fill().map((_, i) => i);
    imagesList.forEach(img => {
      let position = game.getNextSquarePosition(squares);
      squares[position] = game.newSquare(img); 
      position = game.getNextSquarePosition(squares);
      squares[position] = game.newSquare(img); 
    });
    expect(squares.length).toEqual(36);
    expect(squares.every(s => s.guessed === false)).toBeTruthy();
    expect(squares.every(s => s.shown === false)).toBeTruthy();

    const squaredImages = squares.map(s => s.image).sort((a,b) => a - b);
    expect(squaredImages).not.toEqual(imagesList);
    const squaredImagesCounter = Counter(squaredImages);
    const imagesListCounter = Counter(imagesList);
    expect(imagesListCounter.keys()).toEqual(squaredImagesCounter.keys());
    expect([...imagesListCounter.values()].every(v => v === 1)).toBeTruthy();
    expect([...squaredImagesCounter.values()].every(v => v === 2)).toBeTruthy();
  });
});
import React from "react";
import { HSK } from "./decks/Chinese";
import { Hiragana } from "./decks/Hiragana"

export function shuffle(cards) {
  for (let i = cards.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
}
export function double(cards) {
  return [...cards, ...cards];
}

export const Deck = {
  generateCards: async function(num) {
    const promises = [...Array(num)]
      .fill()
      .map(i => fetch(this.url).then(d => d.json()));
    const results = await Promise.all(promises);
    let images = results.map(r => {
      const image = new Image();
      image.src = this.getImg(r);
      return image;
    });
    images = double(images);
    shuffle(images);
    return images;
  }
};
const CatApi = () => {
  return (
    <span>
      Cats provided by{" "}
      <a href="https://thecatapi.com/">TheCatAPI - Cats as a Service</a>,
      Everyday is Caturday.
    </span>
  );
};
export const CatDeck = {
  id: "cat",
  icon: "🐱",
  url: "https://api.thecatapi.com/v1/images/search?size=full",
  getImg: obj => obj[0].url,
  gameOverMsg: "Purrrr! Nicely done!! Meow!!!",
  loadingMsg: "Herding cats. Please wait...",
  crashedMsg: "Cats are sleeping. Please try again later.",
  footerMsg: <CatApi />,
  tryAgainMsg: "Trrrrry again?",
  theme: "theme-blue"
};
CatDeck.generateCards = Deck.generateCards;

const DogApi = () => {
  return (
    <span>
      Dog images courtesy of <a href="https://dog.ceo/dog-api/">Dog CEO</a>.
    </span>
  );
};
export const DogDeck = {
  id: "dog",
  icon: "🐶",
  url: "https://dog.ceo/api/breeds/image/random",
  getImg: obj => obj.message,
  gameOverMsg: "Woof woof.",
  loadingMsg: "Fetching all the dogs. Please wait...",
  crashedMsg: "Dogs are sleeping. Please try again later.",
  footerMsg: <DogApi />,
  tryAgainMsg: "Would you like another try?",
  theme: "theme-green"
};
DogDeck.generateCards = Deck.generateCards;

const generateLanguageCards = function (num, data, pronunciationPos, explanationPos) {
  let images = []
  shuffle(data)
  for (let i = 0; i < num; i++) {
    const image = new Image()
    image.src = createCanvas({
      text: data[i][0],
      pinyin: data[i][pronunciationPos],
      font: "40px sans-serif",
      width: "150",
      height: "150",
    })
    image.alt = `${data[i][0]}: ${data[i][explanationPos]}`
    images.push(image)
  }
  images = double(images)
  shuffle(images)
  return images
}

export const ChineseDeck = {
  id: "chinese",
  icon: "汉子",
  gameOverMsg: "游戏结束",
  loadingMsg: "请等一下...",
  crashedMsg: "不好意思， 我没办法.",
  footerMsg: "好好学习天天向上",
  tryAgainMsg: "Try again?",
  theme: "theme-chinese"
};
ChineseDeck.generateCards = function (num) {
  return generateLanguageCards(num, HSK, 2, 3)
};

export const HiraganaDeck = {
  id: "hiragana",
  icon: "ひらがな",
  gameOverMsg: "終わり",
  loadingMsg: "ちょっと待てくださ...",
  crashedMsg: "だめ",
  footerMsg: "井の中の蛙大海を知らず ",
  tryAgainMsg: "Try again?",
  theme: "theme-hiragana",
}

HiraganaDeck.generateCards = function (num) {
  return generateLanguageCards(num, Hiragana, 1, 1)
}


function createCanvas(input) {
  let canvas = document.createElement("canvas");
  canvas.width = input.width;
  canvas.height = input.height;
  let ctx = canvas.getContext("2d");
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.shadowColor = "#ddd";
  ctx.shadowBlur = 6;
  ctx.font = input.font;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, input.width - 0, input.height - 0);
  ctx.fillStyle = "black";
  ctx.fillText(input.text, input.width / 2, input.height / 2 - 10);
  ctx.shadowBlur = 0;
  ctx.font = "14px Roboto";
  ctx.fillText(input.pinyin, input.width / 2, input.height / 2 + 25);
  return canvas.toDataURL();
}

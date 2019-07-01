import {shuffle, take} from 'lodash'

const SUITS = ['♥', '♠', '♦', '♣'];
const NUMBERS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k', 'a'];
const VALUES = { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'j': 10, 'q': 10, 'k': 10, 'a': 11 };

export default function createDeck() {
  let cards = [];
  SUITS.forEach((suit) => {
    NUMBERS.forEach((number) => {
      cards.push({number: number, suit: suit, value: VALUES[number]});
    });
  });
  cards = shuffle(cards);

  const getCards = (numberOfCards) => {
    const cardsWeGot = take(cards, numberOfCards);
    cards = cards.slice(numberOfCards);
    return cardsWeGot;
  };

  return { getCards }
}




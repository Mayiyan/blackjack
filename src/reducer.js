import createDeck from "./deck";
import {GET_CARD} from "./actions";

const defaultState = () => {
  const deck = createDeck();
  return {
    deck: deck,
    dealerHand: deck.getCards(2),
    hideFirstCard: true,
    players:
      {
        player1: {
          handCards: deck.getCards(2),
          stand: false,
          busted: false,
          winner: ''
        },
        player2: {
          handCards: deck.getCards(2),
          stand: false,
          busted: false,
          winner: '',
        }
      }
  }
};


export default (state = defaultState(), action) => {
  console.log(action)
  switch (action.type) {
    case GET_CARD:
      console.log("hey");
      return state
    default:
      return state
  }
}

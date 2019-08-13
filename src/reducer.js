import createDeck from "./deck";

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
  switch (action.type) {
    default:
      return state
  }
}

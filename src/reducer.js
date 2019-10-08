import createDeck from "./deck";
import {END_ROUND, GET_CARD, RESTART_GAME} from "./actions";
import scoreCalculator from './scoreCalculator';

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

const getPlayer = (playerName, state) => {
  return state.players[playerName];
};

const gameOver = (playerName, state) => {
  const {stand, busted} = getPlayer(playerName, state);
  return stand || busted;
};

const gameOverEveryone = (state) => {
  const players = state.players;
  return Object.keys(players).every((playerName) => gameOver(playerName, state));
};

export default (state = defaultState(), action) => {
  switch (action.type) {
    case GET_CARD:
      const player = getPlayer(action.playerName, state);
      const playerHandCards = [...player.handCards, ...state.deck.getCards(1)];
      const bustedPlayer = scoreCalculator(playerHandCards) > 21;
      const playerStateGetCard = {
        players:
          {
            ...state.players,
            [action.playerName]: {
              ...player,
              handCards: playerHandCards,
              busted: bustedPlayer,
              winner: bustedPlayer ? 'dealer' : 'You'
            }
          }
      };

      return { ...state, ...playerStateGetCard };
    case RESTART_GAME:
      return defaultState();
    case END_ROUND:
      const {deck, dealerHand} = state;
      const playerName = action.playerName;
      const {winner, handCards} = getPlayer(playerName, state);
      let newDealerHand = dealerHand;
      let newWinner = winner;

      while (scoreCalculator(newDealerHand) < 17) {
        newDealerHand = [...dealerHand, ...deck.getCards(1)];
      }

      const dealerScore = scoreCalculator(newDealerHand);
      if (dealerScore <= 21 && dealerScore >= scoreCalculator(handCards)) {
        newWinner = 'dealer';
      }

      const playerState = {...state.players[playerName], winner: newWinner, stand: true};

      const stateBeforeChange = {
        ...state,
        deck: deck,
        dealerHand: newDealerHand,
        players: {...state.players, [playerName]: playerState}
      };

      const hideFirstCard = !gameOverEveryone(stateBeforeChange);

      return {...stateBeforeChange, hideFirstCard};
    default:
      return state
  }
}

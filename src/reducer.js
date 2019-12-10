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
          winner: false,
        },
        player2: {
          handCards: deck.getCards(2),
          stand: false,
          busted: false,
          winner: false,
        }
      }
  }
};

export const getPlayer = (playerName, players) => {
  return players[playerName];
};

export const gameOver = (playerName, players) => {
  const {stand, busted} = getPlayer(playerName, players);
  return stand || busted;
};

export const gameOverEveryone = (players) => {
  return Object.keys(players).every((playerName) => gameOver(playerName, players));
};

let hideFirstCard;
let newDealerHand;

export default (state = defaultState(), action) => {
  console.log(state)
  switch (action.type) {
    case GET_CARD:
      const player = getPlayer(action.playerName, state.players);
      const playerHandCards = [...player.handCards, ...state.deck.getCards(1)];
      const bustedPlayer = scoreCalculator(playerHandCards) > 21;
      const playersStateGetCard = {
        players:
          {
            ...state.players,
            [action.playerName]: {
              ...player,
              handCards: playerHandCards,
              busted: bustedPlayer,
            }
          }
      };

      newDealerHand = state.dealerHand;

      console.log(playersStateGetCard)
      console.log(gameOverEveryone(playersStateGetCard.players))

      if (gameOverEveryone(playersStateGetCard.players)) {
        while (scoreCalculator(newDealerHand) < 17) {
          newDealerHand = [...state.dealerHand, ...state.deck.getCards(1)];
        }
      }

      hideFirstCard = !gameOverEveryone(playersStateGetCard.players);

      return {
        ...state,
        ...playersStateGetCard,
        hideFirstCard,
        deck: state.deck,
        dealerHand: newDealerHand
      };
    case RESTART_GAME:
      return defaultState();
    case END_ROUND:
      const {deck, dealerHand, players} = state;
      const playerName = action.playerName;
      const newPlayerState = {...getPlayer(playerName, players), stand: true};
      const updatedPlayers = {...players, [playerName]: newPlayerState};
      newDealerHand = dealerHand;

      if (gameOverEveryone(updatedPlayers)) {
        while (scoreCalculator(newDealerHand) < 17) {
          newDealerHand = [...dealerHand, ...deck.getCards(1)];
        }
      }

      const stateBeforeChange = {
        ...state,
        deck: deck,
        dealerHand: newDealerHand,
        players: {...updatedPlayers}
      };
      hideFirstCard = !gameOverEveryone(updatedPlayers);

      return {...stateBeforeChange, hideFirstCard};
    default:
      return state
  }
}

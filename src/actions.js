export const GET_CARD = 'get_card';
export const RESTART_GAME = 'restart_game';
export const END_ROUND = 'end_round';

export const getCard = (playerName)  => {
  return {
    type: GET_CARD,
    playerName,
  }
};

export const restartGame = () => {
  return {
    type: RESTART_GAME,
  }
};

export const endRound = (playerName) => {
  return {
    type: END_ROUND,
    playerName
  }
};

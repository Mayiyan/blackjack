import React from 'react';
import Hand from './Hand';
import Player from './Player';
import createDeck from "./deck";
import CompletionTile from "./CompletionTile";
import scoreCalculator from './scoreCalculator';
import styled from 'styled-components';

const StyledApp = styled.div`
  text-align: center;

  > *:not(:last-child) {
    margin-bottom: 20px;
    };
`;

const initialState = () => {
  const deck = createDeck();
  return {
    deck: deck,
    dealerHand: deck.getCards(2),
    hideFirstCard: true,
    player1: {
      handCards: deck.getCards(2),
      stand: false,
      busted: false,
      winner: 'YOU'
    },
    player2: {
      handCards: deck.getCards(2),
      stand: false,
      busted: false,
      winner: 'NOT YOU',
    }
  }
};

class App extends React.Component {
  state = initialState();

  getCard = (player) => {
    const handCardsPlayer = [...this.state[player].handCards, ...this.state.deck.getCards(1)];

    const bustedPlayer = scoreCalculator(handCardsPlayer) > 21;

    const playerState = { ...this.state[player], handCards: handCardsPlayer, busted: bustedPlayer, winner: bustedPlayer ? 'dealer' : 'You' };

    this.setState({[player]: playerState});
  };

  endRound = (player) => {
    const {deck, dealerHand, [player]: {winner, handCards}} = this.state;

    let newDealerHand = dealerHand;
    let newWinner = winner;

    while (scoreCalculator(newDealerHand) < 17) {
      newDealerHand = [...dealerHand, ...deck.getCards(1)];
    }

    const dealerScore = scoreCalculator(newDealerHand);
    if (dealerScore <= 21 && dealerScore >= scoreCalculator(handCards)) {
      newWinner = 'dealer';
    }

    const playerState = { ...this.state[player], winner: newWinner, stand: true };

    this.setState({deck: deck, dealerHand: newDealerHand, [player]: playerState, hideFirstCard: false})
  };

  restartGame = () => {
    this.setState(initialState());
  };

  render() {
    const {dealerHand, hideFirstCard, player1, player2} = this.state;
    const gameOverMan1 = player1.stand || player1.busted;
    const gameOverMan2 = player2.stand || player2.busted;
    const gameOverEveryone = gameOverMan1 && gameOverMan2;
    return (
      <StyledApp>
        <h1>Blackjack!</h1>
        <div>
          <h3>Dealer!</h3>
          <Hand cards={dealerHand} hideFirstCard={hideFirstCard}/>
          {(player1.stand || player2.stand) && <div>The dealer's score is {scoreCalculator(dealerHand)}</div>}
        </div>
        {gameOverEveryone && <CompletionTile restartGame={this.restartGame} winner={player1.winner}/>}
        <div>
          <Player cards={player1.handCards} busted={player1.busted} gameOverMan={gameOverMan1} getCard={() => this.getCard('player1')}
                  endRound={() => this.endRound('player1')} name="Me!"/>
          <Player cards={player2.handCards} busted={player2.busted} gameOverMan={gameOverMan2} getCard={() => this.getCard('player2')}
                  endRound={() => this.endRound('player2')} name="Not Me!"/>
        </div>
      </StyledApp>
    );
  }
}

// The dealer score should only be calculated after the game is over
// Show individual winners (you lose or not basically)
// currently, as long as the dealer's score is less than 17 they keep hitting. There's no need to do this.

// Next things: choose how many players
export default App;


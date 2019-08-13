import React from 'react';
import Hand from './Hand';
import Player from './Player';
import createDeck from "./deck";
import CompletionTile from "./CompletionTile";
import scoreCalculator from './scoreCalculator';
import styled from 'styled-components';
import {connect} from "react-redux";

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

class App extends React.Component {
  state = initialState();

  getCard = (playerName) => {
    const player = getPlayer(playerName, this.state);
    const handCardsPlayer = [...player.handCards, ...this.state.deck.getCards(1)];

    const bustedPlayer = scoreCalculator(handCardsPlayer) > 21;

    const playerState = {
      players:
        {
          ...this.state.players,
          [playerName]: {
            ...player,
            handCards: handCardsPlayer,
            busted: bustedPlayer,
            winner: bustedPlayer ? 'dealer' : 'You'
          }
        }
    };

    this.setState(playerState);
  };

  endRound = (player) => {
    const {deck, dealerHand} = this.state;
    const {winner, handCards} = getPlayer(player, this.state);
    let newDealerHand = dealerHand;
    let newWinner = winner;

    while (scoreCalculator(newDealerHand) < 17) {
      newDealerHand = [...dealerHand, ...deck.getCards(1)];
    }

    const dealerScore = scoreCalculator(newDealerHand);
    if (dealerScore <= 21 && dealerScore >= scoreCalculator(handCards)) {
      newWinner = 'dealer';
    }

    const playerState = {...this.state.players[player], winner: newWinner, stand: true};

    this.setState({
      deck: deck,
      dealerHand: newDealerHand,
      players: {...this.state.players, [player]: playerState}
    }, () => (this.setState({ hideFirstCard: !this.gameOverEveryone(this.state) })))
  };

  restartGame = () => {
    this.setState(initialState());
  };

  gameOver = (player, state) => {
    const {stand, busted} = getPlayer(player, state);
    return stand || busted;
  };

  gameOverEveryone = (state) => {
    const gameOverMan1 = this.gameOver('player1', state);
    const gameOverMan2 = this.gameOver('player2', state);
    return gameOverMan1 && gameOverMan2;
  };

  render() {
    console.log(
      this.props.state, "this is the redux state"
    )
    console.log(this.state, "this is the component state");
    console.log("Are they equal?", this.props.state === this.state);
    const {dealerHand, hideFirstCard} = this.state;
    const player1 = getPlayer('player1', this.state);
    const player2 = getPlayer('player2', this.state);
    return (
      <StyledApp>
        <h1>Blackjack!</h1>
        <div>
          <h3>Dealer!</h3>
          <Hand cards={dealerHand} hideFirstCard={hideFirstCard}/>
          {(player1.stand || player2.stand) && <div>The dealer's score is {scoreCalculator(dealerHand)}</div>}
        </div>
        {this.gameOverEveryone(this.state) && <CompletionTile restartGame={this.restartGame} winner={player1.winner}/>}
        <div>
          <Player cards={player1.handCards} busted={player1.busted} gameOverMan={this.gameOver('player1', this.state)}
                  getCard={() => this.getCard('player1')}
                  endRound={() => this.endRound('player1')} name="Me!"/>
          <Player cards={player2.handCards} busted={player2.busted} gameOverMan={this.gameOver('player2', this.state)}
                  getCard={() => this.getCard('player2')}
                  endRound={() => this.endRound('player2')} name="Not Me!"/>
        </div>
      </StyledApp>
    );
  }
}

// TOMORROW: REDUUUUUUUUUUX
// The dealer score should only be calculated after the game is over
// Show individual winners (you lose or not basically)
// currently, as long as the dealer's score is less than 17 they keep hitting. There's no need to do this.

// Next things: choose how many players

export default connect((state) => ({state}))(App)


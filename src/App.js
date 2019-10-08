import React from 'react';
import Hand from './Hand';
import Player from './Player';
import CompletionTile from "./CompletionTile";
import scoreCalculator from './scoreCalculator';
import styled from 'styled-components';
import {connect} from "react-redux";
import {endRound, getCard, restartGame} from "./actions";

import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";

const StyledApp = styled.div`
  text-align: center;

  > *:not(:last-child) {
    margin-bottom: 20px;
    };
`;

const getPlayer = (playerName, state) => {
  return state.players[playerName];
};

class App extends React.Component {
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
    const {dealerHand, hideFirstCard, endRound, getCard, restartGame} = this.props;
    const player1 = getPlayer('player1', this.props);
    const player2 = getPlayer('player2', this.props);
    return (
      <StyledApp>
        <h1>Blackjack!</h1>
        <div>
          <h3>Dealer!</h3>
          <Hand cards={dealerHand} hideFirstCard={hideFirstCard}/>
          {(player1.stand || player2.stand) && <div>The dealer's score is {scoreCalculator(dealerHand)}</div>}
        </div>
        {
          this.gameOverEveryone(this.props) &&
          <CompletionTile restartGame={restartGame} winner={player1.winner}/>
        }
        <div>
          <Player cards={player1.handCards} busted={player1.busted}
                  gameOverMan={this.gameOver('player1', this.props)}
                  getCard={() => getCard('player1')}
                  endRound={() => endRound('player1')} name="Me!"/>
          <Player cards={player2.handCards} busted={player2.busted}
                  gameOverMan={this.gameOver('player2', this.props)}
                  getCard={() => getCard('player2')}
                  endRound={() => endRound('player2')} name="Not Me!"/>
        </div>
      </StyledApp>
    );
  }
}

// The dealer score should only be calculated after the game is over
// Show individual winners (you lose or not basically)
// currently, as long as the dealer's score is less than 17 they keep hitting. There's no need to do this.
// The dealer is always the winner (at least when the 2nd player wins)
// If player 1 stands, the dealer score is shown

// Next things: choose how many players

App.propTypes = {
  state: PropTypes.object,
  getCard: PropTypes.func,
};

const mapStateToProps = (state) => ({state});
const mapDispatchToProps = (dispatch) => (
  {
    getCard: bindActionCreators(getCard, dispatch),
    restartGame: bindActionCreators(restartGame, dispatch),
    endRound: bindActionCreators(endRound, dispatch)
  }
);
export default connect(mapStateToProps, mapDispatchToProps)(App)


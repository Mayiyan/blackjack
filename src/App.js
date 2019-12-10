import React from 'react';
import Hand from './Hand';
import Player from './Player';
import scoreCalculator from './scoreCalculator';
import styled from 'styled-components';
import {connect} from "react-redux";
import {endRound, getCard, restartGame} from "./actions";
import {gameOver, gameOverEveryone, getPlayer} from './reducer';

import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import Button from "./Button";

const StyledApp = styled.div`
  text-align: center;

  > *:not(:last-child) {
    margin-bottom: 20px;
    };
`;

class App extends React.Component {
  eitherBothStandOrOneStandsAndOneBustsButNotBothBusting = (players) => {
    const player1 = getPlayer('player1', players);
    const player2 = getPlayer('player2', players);

    if (player1.busted && player2.busted) {
      return false
    }

    return gameOverEveryone(players)
  };

  render() {
    const {state, endRound, getCard, restartGame} = this.props;
    const {dealerHand, hideFirstCard, players} = state;
    const player1 = getPlayer('player1', players);
    const player2 = getPlayer('player2', players);

    return (
      <StyledApp>
        <h1>Blackjack!</h1>
        <div>
          <h3>Dealer!</h3>
          <Hand cards={dealerHand} hideFirstCard={hideFirstCard}/>
          {this.eitherBothStandOrOneStandsAndOneBustsButNotBothBusting(players) &&
          <div>The dealer's score is {scoreCalculator(dealerHand)}</div>}
        </div>
        {
          gameOverEveryone(players) &&
          <Button onClick={restartGame} color="crimson" textColor="white">Restart</Button>
        }
        <div>
          <Player cards={player1.handCards}
                  busted={player1.busted}
                  gameOverMan={gameOver('player1', players)}
                  gameOverEveryone={gameOverEveryone(players)}
                  getCard={() => getCard('player1')}
                  endRound={() => endRound('player1')} name="Me!"
          />
          <Player cards={player2.handCards}
                  busted={player2.busted}
                  gameOverMan={gameOver('player2', players)}
                  getCard={() => getCard('player2')}
                  gameOverEveryone={gameOverEveryone(players)}
                  endRound={() => endRound('player2')} name="Not Me!"
          />
        </div>
      </StyledApp>
    );
  }
}


// Show individual winners (you lose or not basically) - We already did it, so clean up that shit and the completion tile (I think we killed the completion tile; check that)
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


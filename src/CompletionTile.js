import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button';

function CompletionTile({restartGame, winner}) {
  return (
    <React.Fragment>
      <div>The winner is {winner}</div>
      <Button onClick={restartGame} color="crimson" textColor="white">Restart</Button>
    </React.Fragment>
);
}

CompletionTile.propTypes = {
  restartGame: PropTypes.func.isRequired,
  winner: PropTypes.string.isRequired
};

export default CompletionTile;

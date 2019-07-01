import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button';

function CompletionTile(props) {
  return (
    <React.Fragment>
      <div>The winner is {props.winner}</div>
      <Button onClick={props.restartGame} color="crimson" textColor="white">Restart</Button>
    </React.Fragment>
);
}

CompletionTile.propTypes = {
  restartGame: PropTypes.func.isRequired,
  winner: PropTypes.string.isRequired
};

export default CompletionTile;

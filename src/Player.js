import Hand from "./Hand";
import scoreCalculator from "./scoreCalculator";
import Button from "./Button";
import React from "react";
import * as PropTypes from "prop-types";
import styled from "styled-components";
import {cardType} from "./propTypes";
import {connect} from "react-redux";


const ButtonWrapper = styled.div`
  > * {
    margin: 10px;
  }
`;

const PlayerWrapper = styled.div`
  display: inline-block;
`;

const winner = (dealerHand, myCards) => {
  const dealerScore = scoreCalculator(dealerHand)
  if (dealerScore <= 21 && dealerScore >= scoreCalculator(myCards)) {
    return false
  }

  return true
};

const endOfGameStuff = (busted, gameOverEveryone, dealerHand, cards) => {
  if (busted) {
    return <b>You busted qq</b>;
  } else if (gameOverEveryone) {
    return winner(dealerHand, cards) ? <b>You WINNER!</b> : <b>You LOSER :((((*(*!</b>;
  }
};

function Player({cards, busted, gameOverMan, getCard, endRound, name, gameOverEveryone, dealerHand}) {
  return <PlayerWrapper>
    <h3>{name}</h3>
    <Hand cards={cards}/>
    <div>Your Score is {scoreCalculator(cards)}</div>
    {endOfGameStuff(busted, gameOverEveryone, dealerHand, cards)}
    {!gameOverMan &&
    <ButtonWrapper>
      <Button onClick={getCard} color="royalblue">Hit meh</Button>
      <Button onClick={endRound} color="crimson">Stand down</Button>
    </ButtonWrapper>
    }
  </PlayerWrapper>;
}

Player.propTypes = {
  cards: PropTypes.arrayOf(cardType).isRequired,
  busted: PropTypes.bool,
  gameOverMan: PropTypes.bool,
  getCard: PropTypes.func.isRequired,
  endRound: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  dealerHand: PropTypes.arrayOf(cardType).isRequired,
};

const mapStateToProps = ({dealerHand}) => {
  return {dealerHand}
}

export default connect(mapStateToProps)(Player);

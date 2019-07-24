import Hand from "./Hand";
import scoreCalculator from "./scoreCalculator";
import Button from "./Button";
import React from "react";
import * as PropTypes from "prop-types";
import styled from "styled-components";


const ButtonWrapper =  styled.div`
  > * {
    margin: 10px;
  }
`;

function Player({cards, busted, gameOverMan, getCard, endRound}) {
  return <div>
    <h3>Me!</h3>
    <Hand cards={cards}/>
    <div>Your Score is {scoreCalculator(cards)}</div>
    {busted && <b>You busted qq</b>}
    {!gameOverMan &&
    <ButtonWrapper>
      <Button onClick={getCard} color="royalblue">Hit meh</Button>
      <Button onClick={endRound} color="crimson">Stand down</Button>
    </ButtonWrapper>
    }
  </div>;
}

Player.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.any),
  busted: PropTypes.bool,
  gameOverMan: PropTypes.bool,
  getCard: PropTypes.func,
  endRound: PropTypes.func
};

export default Player;

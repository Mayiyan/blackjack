import Hand from "./Hand";
import scoreCalculator from "./scoreCalculator";
import Button from "./Button";
import React from "react";
import * as PropTypes from "prop-types";
import styled from "styled-components";
import {cardType} from "./propTypes";


const ButtonWrapper =  styled.div`
  > * {
    margin: 10px;
  }
`;

const PlayerWrapper = styled.div`
  display: inline-block;
`;

function Player({cards, busted, gameOverMan, getCard, endRound, name}) {
  return <PlayerWrapper>
    <h3>{name}</h3>
    <Hand cards={cards}/>
    <div>Your Score is {scoreCalculator(cards)}</div>
    {busted && <b>You busted qq</b>}
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
};

export default Player;

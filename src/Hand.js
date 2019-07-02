import React from 'react';
import Card from './Card';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Something = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  
   > * {
    margin: 0 20px;
  }
`;

function Hand({cards, hideFirstCard}) {
  return (
    <Something>
      {cards.map((card, index) => (<Card hiddenThing={index === 0 && hideFirstCard} {...card} key={index}/>))}
    </Something>
  );
}

const cardType = PropTypes.shape({
  number: PropTypes.string.isRequired,
  suit: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  hiddenThing: PropTypes.bool
});

Hand.propTypes = {
  hideFirstCard: PropTypes.bool,
  cards: PropTypes.arrayOf(cardType).isRequired
};

export default Hand;

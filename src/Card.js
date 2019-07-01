import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';

const backgroundImage = ({hiddenThing}) => hiddenThing ? 'url("https://www.hearthstonetopdecks.com/wp-content/uploads/2014/06/card-back-gold-open-202x300.png")' : "";
const border = ({hiddenThing}) => !hiddenThing ? '2px solid black' : '';
const CardInsides = styled.div`
  height: 300px;
  width: 200px;
  font-size: 50px;
  text-transform: capitalize;
  border: ${border};
  border-radius: 10px;
  background-image: ${backgroundImage};
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: lemonchiffon;
`;

const Thing = styled.div`
  padding: 10px;
`;

const RightThing = styled(Thing)`
  align-self: flex-start;
`;

const LeftThing = styled(Thing)`
  align-self: flex-end;
`;

function Card({number, suit, hiddenThing}) {
  const cardContent = (<React.Fragment>
    <RightThing>{number}</RightThing>
    <div>{suit}</div>
    <LeftThing>{number}</LeftThing>
  </React.Fragment>);
  const theRealInsides = hiddenThing || cardContent;

  return <CardInsides hiddenThing={hiddenThing}>{theRealInsides}</CardInsides>
}

Card.propTypes = {
  number: PropTypes.string.isRequired,
  suit: PropTypes.string.isRequired,
  hiddenThing: PropTypes.bool
};
export default Card

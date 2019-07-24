import PropTypes from "prop-types";

export const cardType = PropTypes.shape({
  number: PropTypes.string.isRequired,
  suit: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  hiddenThing: PropTypes.bool
});

import styled from "styled-components";
import {string} from 'prop-types'

const getColor = ({color}) => color;
const getTextColor = ({textColor}) => textColor || 'black';

const Button = styled.button`
  background-color: ${getColor};
  color: ${getTextColor};
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
`;
Button.propTypes = {
  color: string.isRequired
};

export default Button;

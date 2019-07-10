import styled from "styled-components";
import {string} from 'prop-types'

const getColor = ({color}) => color;
const getTextColor = ({textColor}) => textColor || 'white';

const Button = styled.button`
  background-color: ${getColor};
  color: ${getTextColor};
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 500;
  width: 200px;
  height: 50px;
  text-shadow: black 1px 1px 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color .1s; 
  
  &:hover {
  background-color: purple;
  }
`;
Button.propTypes = {
  color: string.isRequired
};

export default Button;

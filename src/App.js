import React from 'react';
import Hand from './Hand';
import createDeck from "./deck";
import CompletionTile from "./CompletionTile";
import scoreCalculator from './scoreCalculator';
import Button from './Button';
import styled from 'styled-components';

const StyledApp = styled.div`
  text-align: center;

  > *:not(:last-child) {
    margin-bottom: 20px;
    };
`;

const ButtonWrapper =  styled.div`
  > * {
    margin: 10px;
  }
`;

const initialState = () => {
  const deck = createDeck();
  return {
    deck: deck,
    dealerHand: deck.getCards(2),
    handCards: deck.getCards(2),
    roundOver: false,
    busted: false,
    winner: 'YOU',
    hideFirstCard: true,
  }
};

class App extends React.Component {
  state = initialState();

  getCard = () => {
    const handCards = [...this.state.handCards, ...this.state.deck.getCards(1)];
    const busted = scoreCalculator(handCards) > 21;
    this.setState({handCards, busted, winner: busted ? 'dealer' : 'YOUUU'});

  };

  endRound = () => {
    const {dealerHand, deck, winner, handCards} = this.state;

    let newDealerHand = dealerHand;
    let newWinner = winner;

    while (scoreCalculator(newDealerHand) < 17) {
      newDealerHand = [...dealerHand, ...deck.getCards(1)];
    }

    const dealerScore = scoreCalculator(newDealerHand);
    if (dealerScore <= 21 && dealerScore >= scoreCalculator(handCards)) {
      newWinner = 'dealer';
    }

    this.setState({roundOver: true, deck: deck, dealerHand: newDealerHand, winner: newWinner, hideFirstCard: false})
  };

  restartGame = () => {
    this.setState(initialState());
  };

  render() {
    const {roundOver, dealerHand, handCards, busted, winner, hideFirstCard} = this.state;
    const gameOverMan = roundOver || busted;
    return (
      <StyledApp>
        <h1>Blackjack!</h1>
        <div>
          <h3>Dealer!</h3>
          <Hand cards={dealerHand} hideFirstCard={hideFirstCard} />
          {roundOver && <div>The dealer's score is {scoreCalculator(dealerHand)}</div>}
        </div>
        {gameOverMan && <CompletionTile restartGame={this.restartGame} winner={winner}/>}
        <div>
          <h3>Me!</h3>
          <Hand cards={handCards}/>
          <div>Your Score is {scoreCalculator(handCards)}</div>
          {busted && <b>You busted qq</b>}
          {!gameOverMan &&
          <ButtonWrapper>
            <Button onClick={this.getCard} color="royalblue">Hit meh</Button>
            <Button onClick={this.endRound} color="crimson">Stand down</Button>
          </ButtonWrapper>
          }
        </div>
      </StyledApp>
    );
  }
}

export default App;


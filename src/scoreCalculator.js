export default (cards) => {
  const howManyAces = cards.filter((card) => card.value === 11).length;
  let currentScore = cards.reduce((score, card) => score + card.value, 0);
  [...new Array(howManyAces)].forEach(() => {
    if (currentScore > 21) {
      currentScore -= 10;
    }
  });

  return currentScore;
}

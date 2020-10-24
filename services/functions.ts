export function shuffleCards() {
  let cardValues: Array<number> = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
  let counter = cardValues.length;

  // While there are elements in the array
  while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      let temp = cardValues[counter];
      cardValues[counter] = cardValues[index];
      cardValues[index] = temp;
  }

  return cardValues;
}
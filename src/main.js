'use strict';

let _ = require('lodash');

function getCards(input) {
  return input.split('-');
}

function convertJkqToNumberCards(formattedCards) {
  return _.map(formattedCards, card => {
    let isJkq = ['J', 'K', 'Q'].includes(card);
    return isJkq ? '10' : card
  });
}

function getPointAndCount(numberCards) {
  let countOfA = _(numberCards).filter(card => card === 'A').size();
  let initialPoint = _(numberCards)
    .map(element => element === 'A' ? 1 : parseInt(element))
    .sum();

  let point = _(_.times(countOfA)).reduce(bestPoint => {
    let tryPoint = bestPoint + 10;
    return tryPoint > 21 ? bestPoint : tryPoint;
  }, initialPoint);

  return {
    point,
    count: numberCards.length
  };
}

function getComparedResult(aPointAndCount, bPointAndCount) {
  let {point:aPoint, count:aCount} = aPointAndCount;
  let {point:bPoint, count:bCount} = bPointAndCount;
  if (aPoint > 21 && bPoint > 21) return "tied";
  if (aPoint > 21) return 'B won';
  if (bPoint > 21) return 'A won';
  if (aPoint > bPoint) return 'A won';
  if (bPoint > aPoint) return 'B won';
  if (aCount > bCount) return 'B won';
  if (bCount > aCount) return 'A won';
  return 'tied';
}

function printWinner(inputA, inputB) {
  let aPointAndCount = getPointAndCount(convertJkqToNumberCards(getCards(inputA)));
  let bPointAndCount = getPointAndCount(convertJkqToNumberCards(getCards(inputB)));
  let result = getComparedResult(aPointAndCount, bPointAndCount);
  console.log(result);
}

module.exports = {
  getCards,
  convertJkqToNumberCards,
  getPointAndCount,
  getComparedResult,
  printWinner
};

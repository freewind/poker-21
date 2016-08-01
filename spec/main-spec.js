'use strict';
let {
  getCards,
  convertJkqToNumberCards,
  getPointAndCount,
  getComparedResult,
  printWinner
} = require('../src/main.js');

describe('poker-21', function () {

  it('should get cards from input', function () {
    let input = 'A-3-J-Q-7';
    let cards = getCards(input);
    let expected = ['A', '3', 'J', 'Q', '7'];
    expect(cards).toEqual(expected)
  });

  describe('convertJkqToNumberCards', ()=> {
    it('should convert J,K,Q to 10', function () {
      let formattedInput = ['4', '2', 'Q', 'J', 'K'];
      let normalPoints = convertJkqToNumberCards(formattedInput);
      let expected = ['4', '2', '10', '10', '10'];
      expect(normalPoints).toEqual(expected);
    });

    it('should keep A unchanged', function () {
      let formattedInput = ['A', '2'];
      let normalPoints = convertJkqToNumberCards(formattedInput);
      let expected = ['A', '2'];
      expect(normalPoints).toEqual(expected)
    });
  });


  describe('getPointAndCount', ()=> {
    it('should get point and count for cards 2~10', function () {
      let numberCards = ['2', '5', '10'];
      let pointAndCount = getPointAndCount(numberCards);
      let expected = {
        point: 17,
        count: 3
      };
      expect(pointAndCount).toEqual(expected)
    });

    it('should get point and count when considering A as 1', function () {
      let normalPoints = ['A', '2', '3', '4', '10'];
      let pointAndCount = getPointAndCount(normalPoints);
      let expected = {
        point: 20,
        count: 5
      };
      expect(pointAndCount).toEqual(expected)
    });

    it('should get point and count when considering A as 11', function () {
      let normalPoints = ['A', '2', '3', '4'];
      let pointAndCount = getPointAndCount(normalPoints);
      let expected = {
        point: 20,
        count: 4
      };
      expect(pointAndCount).toEqual(expected);
    });

    it('should get point and count for multiple A cards', function () {
      let cards = ['A', '2', 'A', '3', '4', 'A'];
      let pointAndCount = getPointAndCount(cards);
      let expected = {
        point: 12,
        count: 6
      };
      expect(pointAndCount).toEqual(expected)
    });

  });

  describe('getCompareResult', ()=> {
    describe('at least one >21', ()=> {
      it('both > 21', function () {
        let aPointAndCount = {point: 22, count: 4};
        let bPointAndCount = {point: 28, count: 4};
        let compareResult = getComparedResult(aPointAndCount, bPointAndCount);
        let expected = 'tied';
        expect(compareResult).toEqual(expected)
      });
      it('A > 21', function () {
        let aPointAndCount = {point: 22, count: 4};
        let bPointAndCount = {point: 1, count: 4};
        let compareResult = getComparedResult(aPointAndCount, bPointAndCount);
        let expected = 'B won';
        expect(compareResult).toEqual(expected)
      });
      it('B > 21', function () {
        let aPointAndCount = {point: 1, count: 4};
        let bPointAndCount = {point: 22, count: 4};
        let compareResult = getComparedResult(aPointAndCount, bPointAndCount);
        let expected = 'A won';
        expect(compareResult).toEqual(expected)
      });
    });

    describe('both <= 21', ()=> {
      it('A > B', ()=> {
        let aPointAndCount = {point: 21, count: 4};
        let bPointAndCount = {point: 20, count: 4};
        let compareResult = getComparedResult(aPointAndCount, bPointAndCount);
        let expected = 'A won';
        expect(compareResult).toEqual(expected)
      });
      it('A < B', ()=> {
        let aPointAndCount = {point: 20, count: 4};
        let bPointAndCount = {point: 21, count: 4};
        let compareResult = getComparedResult(aPointAndCount, bPointAndCount);
        let expected = 'B won';
        expect(compareResult).toEqual(expected)
      });
      it('A == B, and count of A > count of B', ()=> {
        let aPointAndCount = {point: 20, count: 4};
        let bPointAndCount = {point: 20, count: 3};
        let compareResult = getComparedResult(aPointAndCount, bPointAndCount);
        let expected = 'B won';
        expect(compareResult).toEqual(expected)
      })
    });
  });

  // integration testing
  it('should print winner for two inputs', function () {
    spyOn(console, 'log');
    let inputA = 'A-J-3-4';
    let inputB = 'A-J-7';
    printWinner(inputA, inputB);
    let expected = 'B won';
    expect(console.log).toHaveBeenCalledWith(expected);
  });

});

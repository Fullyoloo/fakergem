'use strict';
const expect = require('chai').expect;
const RickAndMorty = require('../../src/faker/rick-and-morty');
const data = require('../../data/rick-and-morty.json');

describe('RickAndMorty', () => {
  describe('#character', () => {
    it('should return a character', () => {
      [...Array(100).keys()].forEach(_ => {
        expect(RickAndMorty.character()).to.be.oneOf(data['characters']);
      });
    });
  });

  describe('#location', () => {
    it('should return a location', () => {
      [...Array(100).keys()].forEach(_ => {
        expect(RickAndMorty.location()).to.be.oneOf(data['locations']);
      });
    });
  });

  describe('#quote', () => {
    it('should return a quote', () => {
      [...Array(100).keys()].forEach(_ => {
        expect(RickAndMorty.quote()).to.be.oneOf(data['quotes']);
      });
    });
  });
});
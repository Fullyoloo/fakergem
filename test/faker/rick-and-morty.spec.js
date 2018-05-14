'use strict';
const expect = require('chai').expect;
const Faker = require('../../src/faker');
const data = require('../../data/rick-and-morty.json');

describe('RickAndMorty', () => {
  describe('#character', () => {
    it('should return a character', () => {
      [...Array(100).keys()].forEach(_ => {
        expect(Faker.RickAndMorty.character()).to.be.oneOf(data['characters']);
      });
    });
  });

  describe('#location', () => {
    it('should return a location', () => {
      [...Array(100).keys()].forEach(_ => {
        expect(Faker.RickAndMorty.location()).to.be.oneOf(data['locations']);
      });
    });
  });

  describe('#quote', () => {
    it('should return a quote', () => {
      [...Array(100).keys()].forEach(_ => {
        expect(Faker.RickAndMorty.quote()).to.be.oneOf(data['quotes']);
      });
    });
  });
});

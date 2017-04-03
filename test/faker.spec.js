import {expect} from 'chai';
import Faker from '../lib/faker';

describe('#Faker', () => {
  it('should be an object', () => {
    expect(Faker).to.be.a('object');
  });

  describe('#Boolean', () => {
    it('should return an object', () => {
      expect(Faker.Boolean).to.be.a('object');
    });
  });

  describe('#Color', () => {
    it('should return an object', () => {
      expect(Faker.Color).to.be.a('object');
    });
  });

  describe('#LoremFlickr', () => {
    it('should return an object', () => {
      expect(Faker.LoremFlickr).to.be.a('object');
    });
  });

  describe('#Number', () => {
    it('should return an object', () => {
      expect(Faker.Number).to.be.a('object');
    });
  });

  describe('#Placeholdit', () => {
    it('should return an object', () => {
      expect(Faker.Placeholdit).to.be.a('object');
    });
  });
});

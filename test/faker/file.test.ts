'use strict';
import { expect } from 'chai';
import Faker from '../../src/index';
import sinon from 'sinon';
const sinonTest = require('sinon-test')(sinon, {useFakeTimers: false});
import data from '../../data/file.json';

describe('File', () => {
  describe('#extension', () => {
    it('should return an extension', sinonTest(function(this: typeof sinon) {
      this.stub(Faker.Random, 'element').withArgs(data['extensions']).returns('extension');
      expect(Faker.File.extension()).to.eql('extension');
    }));
  });

  describe('#mimeType', () => {
    it('should return a mime type', sinonTest(function(this: typeof sinon) {
      this.stub(Faker.Random, 'element').withArgs(data['mimeTypes']).returns('MIME Type');
      expect(Faker.File.mimeType()).to.eql('MIME Type');
    }));
  });

  describe('#fileName', () => {
    it('should return a filename', sinonTest(function(this: typeof sinon) {
      this.stub(Faker.Lorem, 'words').withArgs(2).returns(['word1', 'word2']);
      this.stub(Faker.Lorem, 'word').returns('name');
      this.stub(Faker.File, 'extension').returns('extension');
      expect(Faker.File.fileName()).to.eql('word1-word2/name.extension');
    }));

    it('should return a filename with specified directory', sinonTest(function(this: typeof sinon) {
      this.stub(Faker.Lorem, 'word').returns('name');
      this.stub(Faker.File, 'extension').returns('extension');
      expect(Faker.File.fileName('test')).to.eql('test/name.extension');
    }));

    it('should return a filename with specified name', sinonTest(function(this: typeof sinon) {
      this.stub(Faker.File, 'extension').returns('extension');
      expect(Faker.File.fileName('test', 'my-file')).to.eql('test/my-file.extension');
    }));

    it('should return a filename with specified extension', () => {
      expect(Faker.File.fileName('test', 'my-file', 'ext')).to.eql('test/my-file.ext');
    });

    it('should return a filename with specified directory separator', () => {
      expect(Faker.File.fileName('test', 'my-file', 'ext', '#')).to.eql('test#my-file.ext');
    });
  });
});

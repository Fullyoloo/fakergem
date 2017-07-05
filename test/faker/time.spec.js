'use strict';
const chai = require('chai');
const { expect } = chai;
const Time = require('../../src/faker/time');

chai.use(require('chai-datetime'));

describe('Time', () => {
  describe('#between', () => {
    it('should return a Date', () => {
      [...Array(100).keys()].forEach(_ => {
        expect(Time.between(new Date(), new Date())).to.be.a('Date');
      });
    });

    it('should return a date between two dates', () => {
      const from = new Date(2017, 9, 1);
      const to = new Date(2017, 9, 31);
      [...Array(100).keys()].forEach(_ => {
        expect(Time.between(from, to)).to.be.withinTime(from, to);
      });
    });

    it('should return only date if Time.BETWEEN is the period', () => {
      const from = new Date(2017, 9, 1);
      const to = new Date(2017, 9, 31);
      [...Array(100).keys()].forEach(_ => {
        const date = Time.between(from, to, Time.BETWEEN);
        expect(date.getHours()).to.equal(0);
        expect(date.getMinutes()).to.equal(0);
        expect(date.getSeconds()).to.equal(0);
      });
    });

    it('should return a time between a specified period', () => {
      [...Array(100).keys()].forEach(_ => {
        expect(Time.between(new Date(), new Date(), Time.ALL).getHours()).to.be.within(0, 23);
        expect(Time.between(new Date(), new Date(), Time.DAY).getHours()).to.be.within(9, 17);
        expect(Time.between(new Date(), new Date(), Time.NIGHT).getHours()).to.be.within(18, 23);
        expect(Time.between(new Date(), new Date(), Time.MORNING).getHours()).to.be.within(6, 11);
        expect(Time.between(new Date(), new Date(), Time.AFTERNOON).getHours()).to.be.within(12, 17);
        expect(Time.between(new Date(), new Date(), Time.EVENING).getHours()).to.be.within(17, 21);
        expect(Time.between(new Date(), new Date(), Time.MIDNIGHT).getHours()).to.be.within(0, 4);
        expect(Time.between(new Date(), new Date(), Time.BETWEEN).getHours()).to.be.within(0, 23);
      });
    });

    it('should return a formatted date', () => {
      const date = new Date();
      [...Array(100).keys()].forEach(_ => {
        expect(Time.between(date, date, Time.ALL, 'yyyy-MM-dd HH:mm:ss')).to.match(/^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}$/);
      });
    });
  });

  describe('#forward', () => {
    it('should return a Date', () => {
      [...Array(100).keys()].forEach(_ => {
        expect(Time.forward()).to.be.a('Date');
      });
    });

    it('should return a time in the future', () => {
      [...Array(100).keys()].forEach(_ => {
        expect(Time.forward()).to.be.afterTime(new Date());
      });
    });

    it('should return a time no greater than the specified number of days', () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const max = new Date();
      max.setDate(max.getDate() + 10);
      max.setHours(23, 59, 59, 0);
      [...Array(100).keys()].forEach(_ => {
        expect(Time.forward(10)).to.be.withinTime(today, max);
      });
    });

    it('should return a time between a specified period', () => {
      [...Array(100).keys()].forEach(_ => {
        expect(Time.forward(10, Time.ALL).getHours()).to.be.within(0, 23);
        expect(Time.forward(10, Time.DAY).getHours()).to.be.within(9, 17);
        expect(Time.forward(10, Time.NIGHT).getHours()).to.be.within(18, 23);
        expect(Time.forward(10, Time.MORNING).getHours()).to.be.within(6, 11);
        expect(Time.forward(10, Time.AFTERNOON).getHours()).to.be.within(12, 17);
        expect(Time.forward(10, Time.EVENING).getHours()).to.be.within(17, 21);
        expect(Time.forward(10, Time.MIDNIGHT).getHours()).to.be.within(0, 4);
      });
    });

    it('should throw if BETWEEN period specified', () => {
      expect(() => Time.forward(10, Time.BETWEEN)).to.throw('invalid period');
    });

    it('should return a formatted date', () => {
      const date = new Date();
      [...Array(100).keys()].forEach(_ => {
        expect(Time.forward(10, Time.ALL, 'yyyy-MM-dd HH:mm:ss')).to.match(/^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}$/);
      });
    });
  });

  describe('#backward', () => {
    it('should return a Date', () => {
      [...Array(100).keys()].forEach(_ => {
        expect(Time.backward()).to.be.a('Date');
      });
    });

    it('should return a time in the past', () => {
      [...Array(100).keys()].forEach(_ => {
        expect(Time.backward()).to.be.beforeTime(new Date());
      });
    });

    it('should return a time no less than the specified number of days', () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const min = new Date();
      min.setDate(min.getDate() - 10);
      min.setHours(0, 0, 0, 0);
      [...Array(100).keys()].forEach(_ => {
        expect(Time.backward(10)).to.be.withinDate(min, today);
      });
    });

    it('should return a time between a specified period', () => {
      [...Array(100).keys()].forEach(_ => {
        expect(Time.backward(10, Time.ALL).getHours()).to.be.within(0, 23);
        expect(Time.backward(10, Time.DAY).getHours()).to.be.within(9, 17);
        expect(Time.backward(10, Time.NIGHT).getHours()).to.be.within(18, 23);
        expect(Time.backward(10, Time.MORNING).getHours()).to.be.within(6, 11);
        expect(Time.backward(10, Time.AFTERNOON).getHours()).to.be.within(12, 17);
        expect(Time.backward(10, Time.EVENING).getHours()).to.be.within(17, 21);
        expect(Time.backward(10, Time.MIDNIGHT).getHours()).to.be.within(0, 4);
      });
    });

    it('should throw if BETWEEN period specified', () => {
      expect(() => Time.backward(10, Time.BETWEEN)).to.throw('invalid period');
    });

    it('should return a formatted date', () => {
      const date = new Date();
      [...Array(100).keys()].forEach(_ => {
        expect(Time.backward(10, Time.ALL, 'yyyy-MM-dd HH:mm:ss')).to.match(/^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}$/);
      });
    });
  });
});

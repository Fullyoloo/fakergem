import { randomNumber, randomFloat } from '../utils/random';

function isDecimal(n) {
  return !!(''+n).match(/\./);
}

function nonZeroDigit() {
  return randomNumber(1, 9);
}

function decimalPart(digits) {
  let num = '';
  if (digits > 1) {
    num = `${nonZeroDigit()}`;
    digits -= 1;
  }
  return leadingZeroNumber(digits) + num;
}

function leadingZeroNumber(digits) {
  return [...Array(digits).keys()]
    .map(_ => randomNumber(0, 9))
    .join('');
}

export default class Number {
  constructor(faker) {
    this.faker = faker;
  }

  number(digits=10) {
    let num = '';
    if (digits > 1) {
      num = `${nonZeroDigit()}`;
      digits -= 1;
    }
    return parseInt(num + leadingZeroNumber(digits));
  }

  decimal(leftDigits=5, rightDigits=2) {
    return `${this.number(leftDigits)}.${decimalPart(rightDigits)}`;
  }

  normal(mean=1, standardDeviation=1) {
    let theta = 2 * Math.PI * Math.random();
    let rho = Math.sqrt(-2 * Math.log(1 - Math.random()));
    let scale = standardDeviation * rho;
    return mean + scale * Math.cos(theta);
  }

  hexadecimal(digits=6) {
    return [...Array(digits).keys()]
      .map(_ => randomNumber(0, 15).toString(16))
      .join('');
  }

  between(from=1.00, to=5000.00) {
    let min = Math.min(from, to);
    let max = Math.max(from, to);
    return isDecimal(min) || isDecimal(max)
      ? randomFloat(min, max)
      : randomNumber(min, max);
  }

  positive(from=1.00, to=5000.00) {
    let value = this.between(from, to);
    return value < 0 ? (value *= -1) : value;
  }

  negative(from=-1.00, to=-5000.00) {
    let value = this.between(from, to);
    return value < 0 ? value : (value *= -1);
  }

  digit() {
    return randomNumber(0, 9);
  }
}

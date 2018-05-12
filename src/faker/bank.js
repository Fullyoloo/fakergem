const data = require('../../data/bank.json');

function buildIbanDigits(details) {
  return [...Array(parseInt(details['ibanDigits'])).keys()].map(_ => {
    return randomNumber(0, 9)
  }).join('');
}

export default class Bank {
  constructor(faker) {
    this.faker = faker;
  }

  name() {
    return this.faker.Random.element(data['names']);
  }

  swiftBic() {
    return this.faker.Random.element(data['swiftBics']);
  }

  iban(bankCountryCode='GB') {
    const details = data['ibanDetails'].find(x => x['bankCountryCode'] == bankCountryCode.toUpperCase());
    const bcc = `${details['bankCountryCode']}${this.faker.Number.between(10, 99)}`;
    const ilc = [...Array(parseInt(details['ibanLetterCode'])).keys()]
      .map(_ => String.fromCharCode(65 + this.faker.Number.between(0, 25)))
      .join('');
    const ib = [...Array(parseInt(details['ibanDigits'])).keys()]
      .map(_ => this.faker.Number.between(0, 9))
      .join('');
    return `${bcc}${ilc}${ib}`;
  }
}

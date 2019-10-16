import { Faker } from '../faker';
import data from '../../data/commerce.json';

function buildCategories(faker, num) {
  const categories = [];
  while (categories.length < num) {
    const category = faker.Random.element(data.departments);
    if (categories.indexOf(category) < 0) {
      categories.push(category);
    }
  }
  return categories;
}

function mergeCategories(categories) {
  const separator = ' & ';
  const commaSeparated = categories.slice(0, -1).join(', ');
  const lastCategory = categories.slice(-1);
  return [commaSeparated, lastCategory].join(separator);
}

export class Commerce {
  private faker: Faker;

  constructor(faker: Faker) {
    this.faker = faker;
  }

  color(): string {
    return this.faker.Color.colorName();
  }

  department(max: number = 3, fixedAmount: boolean = false): string {
    const num = fixedAmount ? max : this.faker.Number.between(1, max);
    const categories = buildCategories(this.faker, num);
    return num > 1 ? mergeCategories(categories) : categories[0];
  }

  productName(): string {
    return [
      this.faker.Random.element(data.productNames.adjective),
      this.faker.Random.element(data.productNames.material),
      this.faker.Random.element(data.productNames.product),
    ].join(' ');
  }

  price(range = { min: 0.0, max: 100.0 }): string {
    const n = this.faker.Number.between(range.min, range.max);
    return (Math.floor(n * 100) / 100.0).toFixed(2);
  }

  promotionCode(digits: number = 6): string {
    return [
      this.faker.Random.element(data.promotionCodes.adjective),
      this.faker.Random.element(data.promotionCodes.noun),
      this.faker.Number.number(digits),
    ].join('');
  }
}

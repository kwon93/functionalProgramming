import {reduce, each, entries, filterL, go, takeAll, range, rangeL, mapL} from "fxjs";
import {closeSync} from "node:fs";

/**
 * 객체지향 프로그래밍에서
 * 사용자 정의 객체를 이터러블로 다루기 ex) map, set
 */

//1, Map, Set
const m = new Map();

m.set('a', 1);
m.set('b', 2);
m.set('c', 3);

go(m, filterL(([_, v]) => v % 2), takeAll, entries => new Map(entries), console.log)

const s = new Set();
s.add(10);
s.add(20);
s.add(30);

const add = (a, b) => a + b;
console.log(reduce(add, s)); //60

console.log("----");

/**
 * Model , Collection
 */

class Model {
  constructor(attrs = {}) {
    this._attrs = attrs;
  }

  get(k) {
    return this._attrs[k];
  }

  set(k, v) {
    this._attrs[k] = v;
    return this;
  }
}

class Collection {
  constructor(models = []) {
    this._models = models;
  }

  at(idx) {
    return this._models[idx];
  }

  add(model) {
    this._models.push(model);
    return this;
  }

  //iterable
  * [Symbol.iterator]() {
    yield* this._models;
  }
}

const coll = new Collection();

coll.add(new Model({id: 1, name: 'AA'}));
coll.add(new Model({id: 2, name: 'BB'}));
coll.add(new Model({id: 3, name: 'CC'}));

console.log(coll.at(2).get('name'));

go(coll, each(m => m.set('name', m.get('name').toLowerCase())));


console.log("----");

/**
 * Product, Products
 */

class Product extends Model {
}

class Products extends Collection {

  totalPrice() {
    console.log([...this]);
    return go(
      this,
      mapL(p => p.get('price')),
      reduce(add)
    )
  }
}

const products = new Products();
products.add(new Product({id: 1, price: 10000}));
products.add(new Product({id: 3, price: 25000}));
products.add(new Product({id: 5, price: 35000}));

console.log(products.totalPrice());


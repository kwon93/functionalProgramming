const products = [
  {name: "반팔티", price: 15000},
  {name: "긴팔티", price: 20000},
  {name: "핸드폰케이스", price: 15000},
  {name: "후드티", price: 30000},
  {name: "바지", price: 25000},
];

console.log("map----");
const map = (f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
};

console.log("filter----");

const filter = (f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
};
console.log("reduce----");
const nums = [1, 2, 3, 4, 5];

const reduce = (f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
};

console.log("함수형 사고 방식 ----");

const add2 = (a, b) => a + b;
const prices = reduce(
  add2,
  map(p => p.price,
    filter(p => p.price < 20000, products)));
//복잡해 보일땐 오른쪽에서 왼쪽으로 읽어가면 된다
console.log(prices);


/**
 * go: args를 특정함수로 축약해 하나의 값으로 만들기
 */

go(
  products,
  products => filter(p => p.price < 20000, products),
  products => map(p => p.price, products),
  prices => reduce(add, prices),
  console.log
)
;


const go = (...args) => reduce((a, f) => f(a), args);
const pipe = (...fs) => (a) => go(a, ...fs);


const f = pipe(
  a => a + 1,
  a => a + 10,
  a => a + 100,
);


/**
 * curry
 * 함수를 리턴하고 원하는 시점에서 함수를 평가시키는 함수
 */

const curry = f =>
  (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);


const multi = (a, b) => a * b;
console.log(multi);


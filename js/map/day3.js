const products = [
  {name: "반팔티", price: 15000},
  {name: "긴팔티", price: 20000},
  {name: "핸드폰케이스", price: 15000},
  {name: "후드티", price: 30000},
  {name: "바지", price: 25000},
];

let names = [];
for (const p of products) {
  names.push(p.name)
}
console.log(names);


/**
 * map
 * 보조 함수를 전달
 */

console.log("map----");
const map = (f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
};

const map1 = map(p => p.name, products);
console.log(map1);


/**
 *  필터
 */
console.log("filter----");

const filter = (f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
};

console.log(...filter(p => p.price < 20000, products));

console.log(filter(n => n % 2, function* () {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
}()));


/**
 * reduce
 * 이터러블 값을 축약해나가는 함수
 */

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

const add = (a, b) => a + b;
console.log(add(add(add(add(add(0, 1), 2), 3), 4), 5)); // 재귀적 호출

let total = 0;
for (const n of nums) {
  total = total + n;
}

console.log(reduce(add, nums));
console.log(reduce((totalPrice, product) =>
  totalPrice + product.price, 0, products));


/**
 * 함수형 사고하기
 */
console.log("함수형 사고 방식 ----");

const add2 = (a, b) => a + b;
const prices = reduce(
  add2,
  map(p => p.price,
    filter(p => p.price < 20000, products)));
//복잡해 보일땐 오른쪽에서 왼쪽으로 읽어가면 된다
console.log(prices);


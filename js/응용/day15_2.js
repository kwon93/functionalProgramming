import {entries, entriesL, filter, filterL, go, indexBy, mapC, mapL, reduce, reject, takeL} from "fxjs";

/**
 * " 어떤 값이던 이터러블 프로그래밍 다루기 "
 * 객체를 제너레이터를 이용해 이터러블 프로그래밍하기
 * 어떤 제너레이터든 이터러블 프로그래밍이 가능하다. ( yield 되는 값들이 Iterable 하다.)
 *
 */
const it = (function* () {
  let i = -1;
  while (++i < 5) {
    yield 10;
    if (false) yield 20;
    yield 30;
  }
})();

console.log([...it]);

const g1 = function* (stop) {
  let i = -1;
  while (++i < stop) {
    yield 10;
    yield 30;
  }
}

go(
  g1(10),
  takeL(2),
  reduce((a, b) => a + b),
  console.log
);


// object()

const a = [
  ['a', 1],
  ['b', 2],
  ['c', 3],
];

const object = entries => go(
  entries,
  mapL(([k, v]) => ({[k]: v})),
  reduce(Object.assign)
)

console.log(object(a));

const objectR = entries => reduce((obj, [k, v]) => (obj[k] = v, obj), {}, entries);

console.log(objectR(
  entries({b: 2, c: 3})
));


// map 값을 JSON으로 전달하기 ( map은 iterable을 지원한다 )
let m = new Map();
m.set('a', 10);
m.set('b', 20);
m.set('c', 30);
m.set('d', 40);
console.log(JSON.stringify(objectR(m)));


console.log('----')
// mapObject
const mapObject = (f, obj) => go(
  obj,
  entries,
  mapL(([k, v]) => [k, f(v)]),
  objectR,
);
console.log(mapObject(a => a + 10, {a: 1, b: 2, c: 3}));


console.log('----')
// pick

const obj2 = {a: 1, b: 2, c: 3, d: 4, e: 5};

const pick = (ks, obj) => go(
  ks,
  mapL(k => [k, obj[k]]),
  reject(([_, v]) => v === undefined),
  objectR
);
console.log(pick(['b', 'c', 'f'], obj2)); // { b: 2, c: 3 }


console.log('----')
//index by index 를 지정해준뒤 추후에 인덱스 검색 방식

const users = [
  {id: 5, name: 'AA', age: 35},
  {id: 10, name: 'BB', age: 26},
  {id: 19, name: 'CC', age: 28},
  {id: 23, name: 'CC', age: 34},
  {id: 24, name: 'EE', age: 23},
];

const indexByK = (f, iter) => reduce((obj, a) => (obj[f(a)] = a, obj), {}, iter)

const users2 = indexByK(u => u.id, users);
console.log(users2[19]);


// console.log(filter(({age}) => age >= 30, users2));

const aaa = go( // indexBy 가 적용된 filtering
  users2,
  entriesL,
  filter(([_, {age}]) => age >= 30),
  takeL(1),
  objectR,
);
console.log(aaa);


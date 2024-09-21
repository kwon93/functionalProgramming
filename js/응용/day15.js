import {reduce, go, mapL, take, takeL, filterL, takeAll, each} from 'fxjs';

/**
 * Iterable programming
 */

const obj1 = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
};

// 1. values
console.log(Object.values(obj1));

function* Lvalues(obj) {
  for (const k in obj) {
    yield obj[k];
  }
}

var it = Lvalues(obj1);
it = takeL(2, it);

console.log(it.next()); //1
console.log(it.next()); //2
console.log(it.next()); //undefined

go(
  obj1,
  Object.values,
  mapL(a => a + 10),
  takeL(2),
  reduce((a , b) => a + b),
  console.log
);

console.log("----");

// 2 entries


function* entriesL(obj) {
  for (const k in obj) {
    yield [k, obj[k]];
  }
}

var it2 = entriesL(obj1);
console.log(it2.next().value); // ['a', 1]


go(
  obj1,
  entriesL,
  filterL(([_, v]) => v % 2),
  mapL(([k,v]) => ({[k] :v})),
  reduce(Object.assign),
  console.log
)

console.log("----");

// 3. keys

function* keysL(obj) {
  for (const k in obj) {
    yield k;
  }
}

go(
  obj1,
  keysL,
  each(console.log)
)

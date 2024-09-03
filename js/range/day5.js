const log = console.log;
/**
 *  range
 */

const range = l => {
  let i = -1;
  let res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};

log(range(5));

const add = (a, b) => a + b;

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
log(reduce(add, range(4)));

/**
 * Lazy Range
 */
log("----LAZY RANGE");

const L = {};
L.range = function* (l) {
  let i = -1;
  while (++i < l) {
    yield i;
  }
};

let list = L.range(4); // 바로 배열로 평가되지 않는다.
log(list); //iterator return
log(reduce(add, list));


function test(name, time, f) {
  console.time(name);
  while (time--) f();
  console.timeEnd(name);
}

test("range", 10, () => reduce(add, range(1000000))); //range : 234.519ms
test("L.range", 10, () => reduce(add, L.range(1000000))); //L.range: 192.293ms

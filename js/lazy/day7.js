const log = console.log;
/**
 * map, filter 계열 함수들이 가지는 결합 법칙
 *
 * - 사용하는 데이터가 무엇이든지
 * - 사용하는 보조 함수가 순수 함수라면 무엇이든지
 * - 결합한다면 결합 순서가 어떻든간에 결과는 다 같다.
 */

//결과를 만드는 함수 reduce, take

//reduce


const curry = f => (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);

const map = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
});

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
});
const go = (...args) => reduce((a, f) => f(a), args);

const join = curry((sep = ',', iter) => reduce((a,b) => `${a}${sep}${b}`, iter));

const queryStr = obj => go(
  obj,
  Object.entries,
  map(([k, v]) => `${k}=${v}`),
  join('&')
);

log(queryStr({limit: 10, offset: 10, type: 'notice'}));


function* a() {
  yield 10;
  yield 20;
  yield 30;
  yield 40;
}

log(join(' - ', a()))



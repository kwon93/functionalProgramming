import {go, log} from '../common.js';

/**
 * 지연된 함수열을 병렬적으로 평가하기
 */
C.reduce = curry((f, acc, iter) => iter ?
  reduce(f, acc, [...iter]) : reduce(f, [...acc]));

const delay500 = a => new Promise(resolve => setTimeout(() => resolve(a), 500));

go(
  [1, 2, 3, 4, 5],
  L.map(a => delay500(a * a)),
  L.filter(a => a % 2),
  C.reduce(add),
  log
);


import {each, filterL, goS, map, mapL, range, rangeL, reduceC, takeL} from "fxjs";
import {go} from '../common.js';
import go1Sync from "fxjs/_internal/go1Sync";

const log = console.log;

/**
 * 홀수 n개 더하기
 */

//명령형 코드
function f1(limit, list) {
  let acc = 0;
  for (const a of list) {
    if (a % 2) {
      const b = a * a;
      acc += b;
      if (--limit == 0) break
    }
  }
  log(acc);
}

f1(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

/**
 * LISP List Processing
 * if 는 filter 로 ->
 * 값 변화후에 변수 할당은 map 으로 ->
 * break 는 take 로 ->
 * 축약 및 합산을 reduce 로 ->
 */
const add = (a, b) => a + b;
const f2 = (limit, list) => {
  go(
    list,
    filterL(a => a % 2),
    mapL(a => a * a),
    takeL(limit),
    reduceC(add),
    console.log
  );
}

f2(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);


/**
 * while 을 range 로 ->
 * 효과를 each 로 ->
 * each 는 함수안에서 부수적인 효과를 일으킨다.
 * */

const f3 = end =>{
  let i = 0;
  while (i < end) {
    ++i;
    log(i);
  }
}

// f3(10);

const f4 = end =>{
  go(
    rangeL(1,end,2),
    each(console.log)
  )
}
f4(10);


log("--------------");

/**
 * 이터러블 프로토콜을 이용한
 * 별 그리기 , 구구단
 */

const join = sep => reduceC( (a,b) => `${a}${sep}${b}`);

//별찍기
go(
  range(1,6),
  mapL(range),
  mapL(mapL(_ => '*')),
  mapL(reduceC(join(''))),
  join('\n'),
  log
);


//구구단
go(
  range(2,10),
  map(a => go(
    range(1,10),
      map(b => `${a}x${b}=${a*b}`),
    join('\n')
  )),
  join('\n\n'),
  log
);



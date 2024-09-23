import {delay, each, filterL, go, map, mapL, range, rangeL, take, takeL} from "fxjs";
/**
 * 시간을 iterable 로 다뤄보기
 */

//range 와 take 의 재해석
go(
  range(10), // 0부터 9까지의 iterable 최대 10번의 일을 실행하겠다.
  take(3), // 최대 3개의 값을 필요로 한다. 최대 3번의 일을 필요로 한다.
  each(console.log)
);

console.log("-lazy-")
go(
  rangeL(10), // 0부터 9까지의 iterable 최대 10번의 일을 실행하겠다.
  mapL(delay(500)),
  filterL(a => a % 2),
  mapL(_ => new Date()),
  takeL(3), // 최대 3개의 값을 필요로 한다. 최대 3번의 일을 필요로 한다.
  each(console.log)
);



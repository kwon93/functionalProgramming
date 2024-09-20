import {take, each, filterL, find, go, log, mapL} from "fxjs";

/**
 * 안전한 합성
 */

const f = x => x + 10;
const g = x => x - 5;
const fg = x => f(g(x));

console.log(fg(10)); //10이 없을 경우 NaN 발생


//monad 형식의 함수 합성
go(
  [],
  mapL(fg),
  each(log)
);


/**
 * find 대신 Filter 써보기
 */
const users = [
  {name: 'AA', age: 35},
  {name: 'BB', age: 26},
  {name: 'CC', age: 28},
  {name: 'CC', age: 34},
  {name: 'EE', age: 23},
];

const user = find(u => u.name == 'AB', users);
if (user) console.log(user); //undefined 예외 처리


//find 와 동일한 시간복잡도를 가지며 안전하게 값을 가져올 수 있다.
go(
  users,
  filterL(u => u.name == 'BB'),
  take(1),
  each(log)
)



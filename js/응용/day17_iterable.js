import {delay, each, flatL, go, mapL, rangeL, takeL, takeUntilL, takeWhileL} from "fxjs";

/**
 * 자동차 경주
 * 할 일들을 이터러블(리스트)로 바라보기
 */

const track = [
  {cars: ['철수', '영희', '철희', '영수']},
  {cars: ['하든', '커리', '듀란트','탐슨']},
  {cars: ['폴', '어빙', '릴리드', '맥컬럼']},
  {cars: ['스파이더맨', '아이언맨']},
  {cars: []},
];


go(
  rangeL(Infinity),
  mapL(idx => track[idx]),
  mapL(({cars}) => cars),
  mapL(delay(500)),
  takeUntilL(({length : l}) => l < 4),
  flatL,
  mapL(car => `${car} 출발 !`),
  each(console.log)
)

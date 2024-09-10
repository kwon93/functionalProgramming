import {flatten, go, log} from '../common.js'
const arr = [
  [1,2],
  [3,4,5],
  [6,7,8],
  [9,10],
];

go(
  arr,
  flatten,
  log
)



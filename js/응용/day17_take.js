import {each, go, takeUntil, takeWhile} from "fxjs";
/**
 * takeWhile, takeUntil
 */


go(
  [1,2,3,4,5,6,7,0,0,0,0],
  takeWhile(a => a), // 마지막 truthy 까지만
  each(console.log)
)

console.log("----");

go(
  [1,2,3,4,5,6,7,0,0,0,0],
  takeUntil(a => a), // 첫번째 truthy 까지만
  each(console.log)
)

console.log("----");
go(
  [0,false,null,undefined,5,6,7,0,0,0,0],
  takeUntil(a => a), // 0, false, null, undefined, 5 출력 후 멈춤
  each(console.log)
)

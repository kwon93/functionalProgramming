import {log} from '../common.js'
import {resolve} from "node:dns";

/**
 * Promise
 * 대기와 성공과 실패를 다루는 일급 값들을 가지고 있다.
 * " 대기 " 할 수 있다... ( 중요 )
 */
function add10(a, callback) {
  setTimeout(() => callback(a + 10), 1000);
}

//callback pattern indent 의 압박
var a = add10(5, res => {
  add10(res, res => {
    add10(res, res => {
      log(res);
    })
  })
});

function add20(a) {
  return new Promise(resolve => setTimeout(() => resolve(a + 20), 500));
}

var b = add20(5)
  .then(add20)
  .then(add20)
  .then(log);


log(a); // undefined
log(b); //pending...  원하는 시점에서 Promise 를 깔 수 있다.

b.then(a =>  a - 20)
  .then(log);



/**
 *  ES6 : for...of 문을 활용한 리스트 순회
 *  간결한 문법과 ' 선언적 형식 '
 */

const list = [1, 2, 3,];
const string = 'abc';

for (const num of list) {
  console.log(num);
}

console.log('----');

for (const char of string) {
  console.log(char);
}

console.log('Array----');
/**
 * Array를 통해 알아보기
 */
const arr = [1, 2, 3];
// arr[Symbol.iterator] = null;
for (const a of arr) {
  console.log(a);
}

console.log('Set----');
/**
 * Set을 통해 알아보기
 */
const set = new Set([1, 2, 3]);
let iterator = set[Symbol.iterator]();
iterator.next();
for (const s of iterator) {
  console.log(s);
}

console.log('Map----');
/**
 * Map을 통해 알아보기
 */
const map = new Map([['a', 1], ['b', 2], ['c', 3]]);
for (const m of map) {
  console.log(m);
}

//Symbol.iterator 로 구현된 함수로 array , set , map  모두 순회가 공통적으로 순회가 가능해진다.

/**
 * 이터러블 / 이터레이터 프로토콜
 * 이터러블 : 이터레이터를 리턴하는 [Symbol.iterator]() 를 가진 값
 * 이터레이터 : {value , done} 객체를 리턴하는 next() 를 가진 값
 * 이터러블 / 이터레이터 프로토콜 : 이터러블을 for...of, 전개 연산자 등과 함께 동작하도록한 규약
 */


//사용자 정의 이터러블
console.log('Custom Iterable----');
const iterable = {
  [Symbol.iterator]() {
    let i = 3;
    return {
      next() {
        return i == 0 ? {done: true} : {value: i--, done: false};
      },
      [Symbol.iterator]() {return this;}
    }
  }
};
const iter = iterable[Symbol.iterator]();
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());

for (const iterElement of iterable) {
  console.log(iterElement)
}


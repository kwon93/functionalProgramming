/**
 * 제너레이터 / 이터레이터
 * 제너레이터: 이터레이터이자 이터러블을 생성하는 함수
 * 제너레이터는 어떤값이던 순회할 수 있게 만들어준다.
 */

function* gen() {
  yield 1;
  if (false) yield 2;
  yield 3;
  return 100; //return 값은 마지막 done 이 true 일때만 존재
}

const iter = gen();
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());

//odds
console.log("---- odds")

function* infinity(i = 0) {
  while (true) {
    yield i++;
  }
}

function* limitGenerator(limit, iter) {
  for (const a of iter) {
    yield a;
    if (a === limit) return;
  }
}

function* odds(limit) {
  for (const a of limitGenerator(limit, infinity(1))) {
    if (a % 2) yield a;
  }
}

const iter2 = odds(10);
console.log(iter2.next());
console.log(iter2.next());
console.log(iter2.next());
console.log(iter2.next());
console.log(iter2.next());
console.log(iter2.next());
console.log(iter2.next());

console.log("----generator를 활용한 홀수 출력 함수")
for (const odd of odds(40)) {
  console.log(odd)
}

const [head, ...tail] = odds(5);
console.log(head);
console.log(tail);




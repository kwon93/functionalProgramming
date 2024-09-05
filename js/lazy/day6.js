/**
 * 이터러블 중심의 프로그래밍에서의 지연 평가 ( Lazy Evaluation )
 */
const log = console.log;

const L = {};
L.map = function* (f, iter) {
  for (const a of iter) yield f(a);
}

let it = L.map(a => a + 10, [1, 2, 3]);
log(it.next());
log(it.next());
log(it.next());
log(it.next());

L.filter = function* (fn, iter) {
  for (const a of iter) {
    if (fn(a)) yield a;
  }
}

const fi = L.filter(a => a % 2, [1,2,3,4,5]);

for (const fiElement of fi) {
  log(fiElement);
}


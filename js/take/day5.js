const log = console.log;

const range = l => {
  let i = -1;
  let res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};

const L = {};
L.range = function* (l) {
  let i = -1;
  while (++i < l) {
    yield i;
  }
};

const take = (l, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length === l) return res;
  }
  return res;
};

log(take(5,range(100))); // 100개중 5개만 가져온다. 100개의 array 를 다 만들고 나서 뽑는다.
log(take(5,L.range(Infinity))); // 5개만 가져온다. 지연평가인 경우 몇개가 됬던간에 딱 5개만 만들고 5개만 뽑는다 매우 효율적



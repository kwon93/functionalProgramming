export const log = console.log;

export const curry = f => (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);

export const map = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
});

const go1 = (a,f) => a instanceof Promise ? a.then(f) : f(a);

export const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }

  return go1(acc, function recur(acc) {
    let cur;
    while (!(cur = iter.next()).done) {
      const a = cur.value;
      acc = f(acc, a);
      if (acc instanceof Promise) return acc.then(recur);
    }
    return acc;
  });
});

export const go = (...args) => reduce((a, f) => f(a), args);

export const join = curry((sep = ',', iter) => reduce((a, b) => `${a}${sep}${b}`, iter));

export const filter = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
});

export const take = curry((l, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length === l) return res;
  }
  return res;
});

export const find = curry((fn, iter) => go(
  iter,
  filter(fn),
  take(1),
  ([a]) => a
));

export const pipe = (...fs) => (a) => go(a, ...fs);

const isIterable = a => a && a[Symbol.iterator];

export function* flatten(iter) {
  for (const a of iter) {
    if (isIterable(a)) for (const b of a) yield b;
    else yield a;
  }
};

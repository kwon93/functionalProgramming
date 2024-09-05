// find
import {log, filter, go, take, curry, map} from "../common.js";

const users = [
  {age: 90},
  {age: 32},
  {age: 17},
  {age: 56},
  {age: 2},
  {age: 42},
  {age: 13},
];

const find = curry((fn, iter) => go(
  iter,
  filter(fn),
  take(1),
  ([a]) => a
));

log(find(u => u.age < 30)(users));


go(users,
  map(u => u.age),
  find(n => n.age < 30),
  log);

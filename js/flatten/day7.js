import {log, take, pipe} from "../common.js";

/**
 *  L.flatten
 */
log()

const L = {};

const isIterable = a => a && a[Symbol.iterator];

L.flatten = function* (iter) {
  for (const a of iter) {
    if (isIterable(a)) for (const b of a) yield b;
    else yield a;
  }
};

var it = L.flatten([[1,2],3,4,5,[6,7,8],9]);
log([...it]); //[ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

const flatten = pipe(
  L.flatten,
  take(Infinity)
)

log('----');

log(flatten([[1,2],3,4,5,[6,7,8],9]));

import {curryN, filterL, goS, mapC, mapL, pipe, reduceC, reduceS, reject} from "fxjs";
import {curry, go, reduce} from "fxjs";

/**
 * 명령어 습관 지우기
 */

const users = [
  {name: 'AA', age: 35},
  {name: 'BB', age: 26},
  {name: 'CC', age: 28},
  {name: 'CC', age: 34},
  {name: 'EE', age: 23},
];

//reduce 하나에 복잡한 로직을 넣는거보다 map 이나 filter 등으로 간단한 함수 조합을 사용하자 (재사용되기 쉽도록)
console.log(
  reduceS((total, u) => total + u.age, 0, users)
);

// 위보다 아래와 같은 코드가 더 조합되기 쉽다.
const add = (a, b) => a + b;
const ages = mapL(u => u.age);
console.log(
  reduceS(
    add, ages(users) //currying
  )
)


console.log(
  reduceS(add,
    mapL(u => u.age,
      filterL(u => u.age < 30, users)
    )
  )
);

goS(
  users,
  filterL(u => u.age < 25),
  mapL(u => u.age),
  reduceS(add),
  console.log
);


console.log("----------")

/**
 * query , queryToObject
 */

const obj1 = {
  a: 1,
  b: undefined,
  c: 'CC',
  d: 'DD'
}

//명령형 코드
const query1 = (obj) => {
  let res = '';
  for (const k in obj) {
    const v = obj[k];
    if (v === undefined) continue;
    if (res != '') {
      res += '&';
    }
    res += k + '=' + v;
  }
  return res;
}

console.log(query1(obj1));

const query2 = (obj) => {
  return Object.entries(obj).reduce((query, [k, v], i) => {
    if (v === undefined) return query;
    return query + (i > 0 ? '&' : '') + k + v + '=' + v;
  }, '');
}


console.log(query2(obj1));


const join = curry((sep, iter) => reduceC((a, b) => `${a}${sep}${b}`, iter));
const query3 = obj => {
  return (
    join('&',
      mapC(
        ([k, v]) => `${k}=${v}`,
        reject(([_, v]) => v === undefined, Object.entries(obj)))
    )
  );
}

console.log(query3(obj1));

const query4go = obj => {
  go(
    obj,
    Object.entries,
    reject(([_, v]) => v === undefined),
    mapL(([k, v]) => `${k}=${v}`),
    join('&'),
    console.log
  )
}
query4go(obj1);

const queryPipe = pipe(
  Object.entries,
  reject(([_, v]) => v === undefined),
  mapL(([k, v]) => `${k}=${v}`),
  join('&'),
);

console.log(queryPipe(obj1));


const split = curry((sep, str) => str.split(sep));
const queryToObj = pipe(
  split('&'),
  mapL(split('=')),
  mapL(([k, v]) => ({[k]: v})),
  reduce(Object.assign)
)

console.log(queryToObj('a=1&c=CC&d=DD'));
//{ a: '1', c: 'CC', d: 'DD' }

const log = console.log;
/**
 * reduce -> HOC 고차함수
 */

const arr = [1,2,3,4,5];

arr.reduce((x,y) => {
  log(`${x}+${y} = ${x+y}`);
  return x + y;
})

const sum = (x,y) => x + y;
const result = arr.reduce(sum);
log(result);

const average = (s, val, i, arr) => {
  s += val
  return i === arr.length - 1 ? s / arr.length : s;
};

log(arr.reduce(average));


const nums = [14,325,23,12,6457,96];

const max = (x,y) => x > y ? x : y;

log(nums.reduceRight(max));

let str = "hello";

const reverse = s => s.split("").reduceRight((x,y)=> x+y);
log(reverse(str)); //olleh

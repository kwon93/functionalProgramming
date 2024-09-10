import {log} from "../common.js";
import {resolve} from "node:dns";
/**
 * 일급 활용
 * 계속해서 프로미스를 응답해 지속적으로 체이닝이 가능하게 해준다. 
 */

const go1 = (a,f) => a instanceof Promise ? a.then(f) : f(a);
const add5 = a => a + 5;

log(go1(10, add5));

const delay =  a => new Promise(resolve => setTimeout( () => resolve(a),100))

var r = go1(delay(10), add5);
r.then(log);

go1(go1(delay(20), add5), log);

/**
 * composition
 *
 */
import {log} from "../common.js";

const g = a => a + 1;
const f = a => a * a;

Array.of(1).map(g).map(f).forEach(r => log(r));
[].map(g).map(f).forEach(r => log(r));

Promise.resolve(1).then(g).then(f).then(log);

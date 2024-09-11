import {go, log, pipe} from "../common.js";

go(
 Promise.resolve(1),
  a => a + 10,
  a => Promise.resolve(a + 100),
  a => a + 1000,
  a => a + 10000,
  log
)


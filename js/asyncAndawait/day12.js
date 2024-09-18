/**
 * async/await
 * 비동기적으로 일어나는 코드를 동기적으로 다룰 수 있게
 */

function time() {

}

function delay(a) {
  return new Promise(resolve => setTimeout(() => resolve(a), 500));
}

//async는 반드시 Promise를 return한다.
async function f1() {
  const a =  await delay(10); //Promise를 return해야 await를 할 수 있다.
  console.log(a);
}

f1();


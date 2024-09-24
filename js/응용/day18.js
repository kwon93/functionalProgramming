import {
  go, delay, each, rangeL, mapL, takeUntilL, flat, map, reject, rejectL
} from "fxjs";

/**
 *  아임포트 결제 누락 스케쥴러 만들기
 */

const Impt = {
  payments: {
    1: [{imp_id: 11, order_id: 1, amount: 15000}, {imp_id: 12, order_id: 2, amount: 25000}, {
      imp_id: 13,
      order_id: 3,
      amount: 10000
    },],
    2: [{imp_id: 14, order_id: 4, amount: 25000}, {imp_id: 15, order_id: 5, amount: 45000}, {
      imp_id: 16,
      order_id: 6,
      amount: 15000
    },],
    3: [{imp_id: 17, order_id: 7, amount: 20000}, {imp_id: 18, order_id: 8, amount: 30000},],
    4: [],
    5: [], //...
  }, getPayments: page => {
    console.log(`https://..?page=${page}`);
    return delay(1000 * 3, Impt.payments[page]);
  }, cancelPayments: imp_id => Promise.resolve(`${imp_id}: 취소 완료`)
}


const DB = {
  getOrders: ids => delay(100, [{id: 1}, {id: 3}, {id: 7},])
};


const job = async () => {
  // 결제된 결제모듈측 payment 정보를 가져온다. 페이지 단위로 가져와 하나로 합친다.
  const payments = await go(rangeL(1, Infinity), mapL(Impt.getPayments), takeUntilL(({length}) => length < 3), //length 가 있을때까지
    flat,);

  // 결제가 실제로 완료된 가맹점 측 주문서 id들을 뽑는다.
  const orderIds = await go(payments, map(p => p.order_id), //결제를 시도했던 모든 오더
    DB.getOrders, // 실제 결제된 오더
    map(({id}) => id),);

  //결제 모듈의 payments 와 가맹점의 주문서를 비교해서 결제를 취소해야할 id를 뽑아서 결제 취소 API 를 실행
  await go(payments, rejectL(p => orderIds.includes(p.order_id)), // 실제 결제가 된 오더는 포함하지않는다.
    mapL(p => p.imp_id), mapL(Impt.cancelPayments), each(console.log))
}

// 5초에 한번만 한다.
(function recur(){
  Promise.all([delay(5000, undefined), job()]).then(recur)
  // job().then(recur)
})();

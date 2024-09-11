import {find, log} from "../common.js";

/**
 *
 * Kleisli Composition
 *
 * */

var users = [{id: 1, name: 'aa'}, {id: 2, name: 'bb'}, {id: 3, name: 'cc'}];


const getUserById = (id) => {
  find(u => u.id === id, users) || Promise.reject('없서용');
}

const f = ({name}) => name;
const g = getUserById;

const fg = id => Promise.resolve(id).then(g).then(f).catch(a => a);

fg(2).then(log);

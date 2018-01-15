const ReplaySubject = require('rxjs/ReplaySubject').ReplaySubject;

const o = new ReplaySubject();
o.next(1);
let x = o.subscribe(r => console.log(`x${r}`)); // x1, x2
o.next(2);
x.unsubscribe();
o.next(3);
let y = o.subscribe(r => console.log(`y${r}`)); // y1, y2, y3

/*
 * output
 * x1
 * x2
 * y1
 * y2
 * y3
 */

console.log('---------------------------');

const k = new ReplaySubject(2); // 2 is buffer size, will buffer this no of last records
k.next(1);
let a = k.subscribe(r => console.log(`a${r}`)); // a1, a2
k.next(2);
a.unsubscribe();
k.next(3);
let b = k.subscribe(r => console.log(`b${r}`)); // b2, b3
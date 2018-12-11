// once subscribe, the previous value will be used once first
const BehaviorSubject = require('rxjs/BehaviorSubject').BehaviorSubject;

const o = new BehaviorSubject(1);
let x = o.subscribe(r => console.log(`x${r}`)); // x1, x2, x3
o.next(2);
let y = o.subscribe(r => console.log(`y${r}`)); // y2, y3, y4
o.next(3);
x.unsubscribe();
o.next(4);
y.unsubscribe();
o.next(5);
o.next(6);
let z = o.subscribe(r => console.log(`z${r}`)); // z6

/*
 * output
 * x1
 * x2
 * y2
 * x3
 * y3
 * y4
 * z6
 */
const Subject = require('rxjs/Subject').Subject;

const o = new Subject();
o.next(1);
let x = o.subscribe(r => console.log(`x${r}`)); // x2, x3
o.next(2);
o.next(3);
x.unsubscribe();
o.next(4);
let y = o.subscribe(r => console.log(`y${r}`)); // y5
o.next(5);
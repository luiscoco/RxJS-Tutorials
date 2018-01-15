const AsyncSubject = require('rxjs/AsyncSubject').AsyncSubject;

const o = new AsyncSubject;
o.next(1);
let x = o.subscribe(console.log); // 3
o.next(2);
o.next(3);
o.complete();
x.unsubscribe();
o.next(4);
o.complete();

let y = o.subscribe(console.log); // 3, once complete, the value will not change anymore and the final result will be cached
y.unsubscribe();
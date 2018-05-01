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

const a2 = new AsyncSubject;
a2.subscribe(void 0, void 0, () => console.log('completed a2')); // completed a2
a2.complete();

const a3 = new AsyncSubject;
a3.complete();
a3.subscribe(void 0, void 0, () => console.log('completed a3')); // completed a3

const a4 = new AsyncSubject;
a4.subscribe(void 0, void 0, () => console.log('completed a4')); // completed a4
a4.complete();
a4.complete(); // won't print

const a5 = new AsyncSubject;
a5.subscribe(r => console.log(r), void 0, r => console.log(r)); // nothing printed, complete is required to trigger next and complete
a5.next(1);
a5.next(2);
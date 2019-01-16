const Subject = require('rxjs/Subject').Subject;
const from = require('rxjs').from;
require('rxjs/add/operator/mergeMap');
require('rxjs/add/operator/finally');
require('rxjs/add/operator/share');

const o = new Subject();
o.next(1);
let x = o.subscribe(r => console.log(`x${r}`)); // x2, x3
o.next(2);
o.next(3);
x.unsubscribe();
o.next(4);
let y = o.subscribe(r => console.log(`y${r}`)); // y5
o.next(5);


const o1 = new Subject();

o1
    .flatMap(() => Promise.resolve('a'))
    .flatMap(r => {
        console.log(r); //a
        return Promise.resolve('b');
    })
    .finally(() => {
        console.log('finally');
    })
    .subscribe(() => console.log('done')); // done

o1.next(1);

o1.complete(); // complete is required to trigger finally

// Error

const o2 = new Subject();

o2.subscribe(_ => console.log(`o2a ${_}`));
o2.next(1);

o2.unsubscribe();

try {
    o2.next(2);
} catch (e) {
    console.error('Error: (o2.next)', e.message);
}

try {
    o2.subscribe(_ => console.log(`o2b ${_}`));
} catch (e) {
    console.error('Error: (o2.subscribe)', e.message);
}

// subscribe to another observable

const subject = new Subject();
subject.subscribe(_ => console.log(`A: ${_}`));
subject.subscribe(_ => console.log(`B: ${_}`));

const o3 = from([0, 1]);

o3.subscribe(subject);
/* Prints */
/**
 A: 0
 B: 0
 A: 1
 B: 1
 **/
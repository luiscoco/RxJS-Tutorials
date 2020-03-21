const Observable = require('rxjs/Observable').Observable;
require('rxjs/add/observable/combineLatest');
require('rxjs/add/observable/throw');
require('rxjs/add/observable/of');
require('rxjs/add/operator/delay');
require('rxjs/add/observable/defer');

// All of the observables must have at least one emit before combineLatest emits a value
const s1 = Observable.of(1).delay(2000);
const s2 = Observable.of(2).delay(3000);

s1.subscribe(result => console.log(result)); // 1
s2.subscribe(result => console.log(result)); // 2

Observable.combineLatest(s1, s2)
    .subscribe(results => console.log('all done', results), console.error, () => console.log('completed 1')); // all done [1,2] completed 1

// Works like promise.all
const s3 = Observable.of(3).delay(4000);
const s4 = Observable.create((subscriber) => {
    setTimeout(() => {
        subscriber.error(4);
    }, 5000);
});

s3.subscribe(result => console.log(result)); // 3
s4.subscribe(result => console.log(result), () => void 0);

Observable.combineLatest(s3, s4)
    .subscribe(results => console.log('all done', results), // won't print
        console.error, // 4
        () => console.log('completed 2')
    );

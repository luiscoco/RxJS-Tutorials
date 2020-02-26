const Rx        = require('rxjs/Rx');
const of        = require('rxjs/observable/of').of;
const expand    = require('rxjs/operators').expand;
const skipWhile = require('rxjs/operators').skipWhile;
const take      = require('rxjs/operators').take;

let emittedValue = 0;

const api = Rx.Observable.create((subscriber) => {
    console.warn('called');
    setTimeout(() => {
        subscriber.next(emittedValue++);
    }, 1000);
});


of(true).pipe(
    expand(v => {
        return v < 2 ? api : Rx.Observable.empty()
    }),
    skipWhile(v => v < 2),
    take(1),
).subscribe(console.log);

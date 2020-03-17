const Rx    = require('rxjs/Rx');
const timer = require('rxjs').timer;
const flatMap = require('rxjs/operators').flatMap;
const first = require('rxjs/operators').first;
const tap = require('rxjs/operators').tap;
const take = require('rxjs/operators').take;
// Any need to call unsubscribe for RxJS first()
// It unsubscribes automatically after calling first(). The current syntax is
// observable.pipe(first()).subscribe(func)

const o = Rx.Observable.create((subscriber) => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
});

o.first().subscribe(console.log); // 1

o.take(2).subscribe(console.log); // 1 2

o.elementAt(2).subscribe(console.log); // 3

o.takeWhile(value => value < 3).subscribe(console.log); // 1 2

o.takeUntil(Rx.Observable.timer(1000)).subscribe(console.log); // 1 2 3

timer(1000, 200).map(i => `outer ${i}`).pipe(
    tap(r => console.warn('Running ' + r)),
    // take(1), // it depends, if you would like to stop the outer from running as soon as possible, put take(1) here
    // if the outer is a heavy job, not-repeatable or api call , put first before another flatmapping another observable.
    flatMap(r => timer(300, 500).map(i => `${r} inner ${i}`)),
    take(1), // it's only necessary to put take(1) or first here in order for the outer observable to be unsubscribed.
    tap(console.log)
).subscribe();
/**
 Running outer 0
 Running outer 1
 outer 0 inner 0
**/

/**
 if we put take(1) or first() before flatMap,
 Running outer 0
 outer 0 inner 0
**/

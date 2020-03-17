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

timer(1000, 1000).map(i => `outer ${i}`).pipe(
    // take(1), // Unnecessary
    flatMap(r => timer(0, 500).map(i => `${r} inner ${i}`)),
    take(1), // it's only necessary to put take(1) or first here in order for the outer observable to be unsubscribed.
    tap(console.log)
).subscribe();

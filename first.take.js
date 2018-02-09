const Rx = require('rxjs/Rx');

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


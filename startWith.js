const Rx = require('rxjs/Rx');

const o = Rx.Observable.create((subscriber) => {
    Rx.Observable.timer(0, 500).subscribe(v => subscriber.next(v + 5));
});

o.takeWhile(value => value < 3).startWith(0).subscribe(console.log); // 0

const Observable = require('rxjs/Observable').Observable;
require('rxjs/add/observable/timer');

let i = Observable.timer(0, 1000);
let s = i.subscribe((value) => {
    console.log(value); // 0 1 2 3 4 5 6
    if (value > 5) {
        s.unsubscribe();
    }
});

i2 = Observable.timer(1000); // function like of(1).delay(1000)
s2 = i2.subscribe((value) => {
    console.error(value); // 0
});

const Observable = require('rxjs/Observable').Observable;
require('rxjs/add/observable/timer');

let i = Observable.timer(0, 1000);
let s = i.subscribe((value) => {
    console.log(value); // 0 1 2 3 4 5 6
    if (value > 5) {
        s.unsubscribe();
    }
});
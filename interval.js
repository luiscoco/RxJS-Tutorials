const Rx = require('rxjs/Rx');

var source = Rx.Observable
    .interval(1000 /* ms */)
    // .timeInterval()
    .take(3);

source.subscribe(console.log);

var source2 = Rx.Observable
    .interval(1000 /* ms */)
    .timeInterval()
    .take(3);

source2.subscribe(console.log);
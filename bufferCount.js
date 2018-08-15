const Observable = require('rxjs/Observable').Observable;
require('rxjs/add/operator/bufferCount');

const o = Observable.create((subscriber) => {
    subscriber.next('a'); // wait 3 next
    setTimeout(function () {
        subscriber.next('b');
    }, 500);
    setTimeout(function () {
        subscriber.next('c'); // emit
    }, 2000);
    setTimeout(function () {
        subscriber.next('d'); // wait 3 next
    }, 2500);
    setTimeout(function () {
        subscriber.next('e');

        subscriber.complete(); // must call complete or ['d', 'e'] will not be emitted.
    }, 3600);
}).bufferCount(3); // buffer for 3 entries

o.subscribe(console.log);
/**
 [ 'a', 'b', 'c' ]
 [ 'd', 'e' ]
 **/
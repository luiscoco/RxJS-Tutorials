const Observable = require('rxjs/Observable').Observable;
require('rxjs/add/operator/bufferTime');

const o = Observable.create((subscriber) => {
    subscriber.next('a'); // count 1.5 seconds
    setTimeout(function () {
        subscriber.next('b'); // no more emits, so ['a', 'b'] is emitted.
    }, 500);
    setTimeout(function () {
        subscriber.next('c'); // count 1.5 seconds
    }, 2000);
    setTimeout(function () {
        subscriber.next('d'); // emit ['c', 'd']
    }, 2500);
    setTimeout(function () {
        subscriber.next('e'); // emit ['e']

        subscriber.complete();
    }, 3600);
}).bufferTime(1500); // buffer for 1.5 seconds

o.subscribe(console.log);
/**
 [ 'a', 'b' ]
 [ 'c', 'd' ]
 [ 'e' ]
**/
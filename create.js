const Observable = require('rxjs/Observable').Observable;

const o = Observable.create((subscriber) => {
    subscriber.next('a');
    subscriber.error('b'); // when observer.error() or observer.complete() is called, the execution stops and no more data will be delivered to the subscribers.
    subscriber.complete();
});

o.subscribe(console.log, console.log);

Observable.create((subscriber) => {
    console.log('won\'t run because subscribe is not called');
});
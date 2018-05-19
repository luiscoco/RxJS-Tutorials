const Observable = require('rxjs/Observable').Observable;
require('rxjs/add/operator/debounce');
const timer = require('rxjs/observable/timer').timer;

const o = Observable.create((subscriber) => {
    subscriber.next('a'); // count 1000ms
    setTimeout(function () {
        subscriber.next('b'); // recount 1000ms, since c is thrown after 1500ms, so b is printed
    }, 500);
    setTimeout(function () {
        subscriber.next('c');  // count 1000ms
    }, 2000);
    setTimeout(function () {
        subscriber.next('d'); // count 1000ms, since e is thrown after 1100ms, so d is printed
    }, 2500);
    setTimeout(function () {
        subscriber.next('e'); // count 1000ms, and not next is thrown, so e is printed.
    }, 3600);
}).debounce(val => { //  debounce is useful when the debounce rate is variable!
    let t = 1000;
    if (val === 'c') {
        t = 400;
    }
    return timer(t);
});

o.subscribe(console.log); // b, c, d, e
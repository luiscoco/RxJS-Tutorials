const Observable = require('rxjs/Observable').Observable;
require('rxjs/add/operator/debounceTime');

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
}).debounceTime(1000);

o.subscribe(console.log); // b, d, e


/**
 * Web usage
 // Same Example by using DebounceTime with delay of 1 sec.
 var input = document.getElementById('textInput');
 var input$ = Rx.Observable
 .fromEvent(input, 'keyup')
 .map(x => x.currentTarget.value)
 .debounceTime(1000)
 input$.subscribe(x => sendValues(x));
 function sendValues(x){
  var pre = document.createElement('pre');
  pre.innerHTML = JSON.stringify(x);
  document.getElementById('results').appendChild(pre);
}
 */
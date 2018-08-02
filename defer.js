const Observable = require('rxjs/Observable').Observable;
require('rxjs/add/observable/defer');
require('rxjs/add/observable/of');

// const defer = require('rxjs/observable/defer');

const s1 = Observable.defer(() => { // delay execution until subscribe is called
    console.log('executed');
    return Observable.of(1);
});

console.log('before subscribe');
s1.subscribe(console.log);
console.log('after subscribe');
/**
 before subscribe
 executed
 1
 after subscribe
**/
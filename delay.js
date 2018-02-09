const Rx = require('rxjs/Rx');
const Observable = require('rxjs/Observable').Observable;
require('rxjs/add/operator/delay');

let o = Rx.Observable.create((observer) => {
    console.log('run...'); // call immediately
    observer.next(1);
    observer.next(2);
});

o.delay(2000).subscribe(console.log);

let k = Observable.create((o)=>{
    o.next(3);
    o.next(4);
});

k.delay(3000).subscribe(console.log);



let oc = Observable.create(obs => {
    obs.next(1);
});
oc.delay(2000).subscribe(() =>{
    console.log('run2...'); // late run
    //do sth
});
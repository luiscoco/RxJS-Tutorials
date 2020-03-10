const Observable = require('rxjs/Observable').Observable;
require('rxjs/add/observable/of');
require('rxjs/add/operator/delay');
require('rxjs/add/operator/mergeMap');

Observable.of(1)
.delay(1000)
.flatMap((value) => {
    return Observable.of(value + 1)
})
.subscribe(console.log); // 2

Observable.of([1]).flatMap(v => {
    console.log(typeof (v + '234'));
    return v + '234'; // flatmap can take array or iterable as a response.
}).subscribe(console.log);
/**
 * output
 string
 1
 2
 3
 4
 **/

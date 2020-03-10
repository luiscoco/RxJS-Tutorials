const Observable = require('rxjs/Observable').Observable;
require('rxjs/add/observable/of');
require('rxjs/add/operator/delay');
require('rxjs/add/operator/mergeMap');
require('rxjs/add/operator/map');
const toArray = require('rxjs/operators').toArray;

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
// so use flatmap in conjunction with toArray

Observable.of([100, 101, 102]).flatMap(v => v).map(v => v + 1).pipe(toArray()).subscribe(console.log);
// [101, 102, 103]

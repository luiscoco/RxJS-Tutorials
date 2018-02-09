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
const Observable = require('rxjs/Observable').Observable;
require('rxjs/add/observable/of');
require('rxjs/add/operator/delay');

Observable.of([1,2,3,4]).subscribe(console.log); // [1, 2, 3, 4]

// setTimeout equivalent
Observable.of(1).delay(1000).subscribe(() => {
    // do sth
});
const Observable = require('rxjs/Observable').Observable;
require('rxjs/add/observable/of');
require('rxjs/add/operator/delay');
const delay = require('rxjs/operators').delay;
const tap   = require('rxjs/operators').tap;

Observable.of([1, 2, 3, 4]).subscribe(console.log); // [1, 2, 3, 4]

// setTimeout equivalent
Observable.of(1).delay(1000).subscribe(() => {
    // do sth
});

Observable.of(1)
    .pipe(
        delay(1000),
        tap(i => console.log('tapping ' + i))
    )
    .subscribe(i => console.log('end ' + i));
/**
 tapping 1
 end 1
 **/
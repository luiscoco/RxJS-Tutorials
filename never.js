const Observable = require('rxjs/Observable').Observable;
require('rxjs/add/observable/timer');
require('rxjs/add/operator/mergeMap');
require('rxjs/add/observable/of');
require('rxjs/add/observable/never');

const timer = Observable.timer(0, 1000)
    .flatMap((value) => {
        console.log('running...', value);
        if (value > 3) {
            return Observable.of(1);
        }
        return Observable.never();
    })
    .subscribe(() => {
        console.log('done');
        timer.unsubscribe();
    });
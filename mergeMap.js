const Observable = require('rxjs/Observable').Observable;
require('rxjs/add/observable/from');
require('rxjs/add/observable/of');
require('rxjs/add/operator/delay');
require('rxjs/add/operator/map');
require('rxjs/add/operator/mergeMap');

const arr = [
    1,
    2,
    3,
    4,
    5
];

Observable.from(arr)
.mergeMap((value, index) => {
    console.log('calculating ' + value);
    const now = new Date().getTime();
    return Observable.of('the square of ' + value + ' is '+  value * value)
        .delay((index + 1) * 1000)
        .map(result => result  + '. Time used ' + (new Date().getTime() - now));
}, 3)
.subscribe(console.log);

/**
 calculating 1
 calculating 2
 calculating 3
 the square of 1 is 1. Time used 1001
 calculating 4
 the square of 2 is 4. Time used 2000
 calculating 5
 the square of 3 is 9. Time used 3000
 the square of 4 is 16. Time used 4000
 the square of 5 is 25. Time used 5000

 **/
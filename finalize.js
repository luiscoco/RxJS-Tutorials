const Observable = require('rxjs/Observable').Observable;
require('rxjs/add/observable/from');
const finalize   = require('rxjs/operators').finalize;

Observable.from([1,2,3,4])
    .pipe(
        finalize(_ => {
            // perhaps we can do some tear down logic here
            console.log(_  + '. Finalized.');
        })
    )
    .subscribe(console.log, console.error, _ => console.log('Complete here.')); // 1, 2, 3, 4

console.log('==============================');

Observable.create((subscriber) => {
    subscriber.error('hi');
    })
    .pipe(
        finalize(_ => {
            // perhaps we can do some tear down logic here
            console.log(_  + '. Error Finalized.');
        })
    )
    .subscribe(console.log, console.error, _ => console.log('Error complete here.')); // 1, 2, 3, 4

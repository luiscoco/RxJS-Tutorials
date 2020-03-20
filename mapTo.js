const timer = require('rxjs').timer;
const mapTo = require('rxjs/operators').mapTo;
const tap = require('rxjs/operators').tap;

timer(1000).pipe(
    mapTo('hihi'),
    tap(console.log)
).subscribe();

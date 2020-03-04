const withLatestFrom = require('rxjs/operators').withLatestFrom;
const interval       = require('rxjs').interval;
const tap            = require('rxjs/operators').tap;

const sourceA = interval(15000);
const sourceB = interval(500);

sourceA.pipe(
    withLatestFrom(sourceB),
    tap(([first, second]) => {
        console.log(`First Source (5s): ${first} Second Source (1s): ${second}`);
    })
).subscribe();

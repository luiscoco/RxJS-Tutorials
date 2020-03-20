const Rx        = require('rxjs/Rx');
const of        = require('rxjs/observable/of').of;
const expand    = require('rxjs/operators').expand;
const skipUntil = require('rxjs/operators').skipUntil;
const take      = require('rxjs/operators').take;
const tap      = require('rxjs/operators').tap;
const timer      = require('rxjs').timer;

const o$ = timer(3000);

timer(0, 1000).pipe(
    skipUntil(o$),
    take(1),
    tap(console.log)
).subscribe();
// wait 3 seconds,
// see 3 printed

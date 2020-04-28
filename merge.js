const Observable    = require('rxjs/Observable').Observable;
// require('rxjs/add/observable/merge');
const merge         = require('rxjs/observable/merge').merge;
const of            = require('rxjs/observable/of').of;
const never         = require('rxjs/observable/never').never;
const toArray       = require('rxjs/operators').toArray;
const timer         = require('rxjs').timer;
const zip           = require('rxjs').zip;
const combineLatest = require('rxjs/observable/combineLatest').combineLatest;
require('rxjs/add/operator/delay');
require('rxjs/add/operator/map');


// merge
// a   c
//   b
// => a b c

// combinelatest
// a   c
//   b
// => [a, b]

merge(of(1), of(2).delay(4000))
    .subscribe(console.log);
// 1
// 2

// vs combineLatest
combineLatest([of(3), of(4).delay(4000)])
    .subscribe(console.log); // [3, 4]


merge(of(3), never())
    .subscribe(console.log);

/**
 *
 * output
 * 1
 * 3
 * 2
 */

merge(of(1).delay(400), of(2).delay(900)).pipe(toArray()).subscribe(console.error);

const data = [11, 12];

zip(
    merge(...data.map(num => timer(900).map(() => `${num}a`))).pipe(toArray()),
    merge(...data.map(num => timer(900).map(() => `${num}b`))).pipe(toArray()),
).subscribe(console.error);
// [ [ '11a', '12a' ], [ '11b', '12b' ] ]

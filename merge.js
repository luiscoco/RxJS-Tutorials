const Observable = require('rxjs/Observable').Observable;
// require('rxjs/add/observable/merge');
const merge      = require('rxjs/observable/merge').merge;
const of         = require('rxjs/observable/of').of;
const never      = require('rxjs/observable/never').never;
const toArray      = require('rxjs/operators').toArray;
require('rxjs/add/operator/delay');

merge(of(1), of(2).delay(4000))
    .subscribe(console.log);


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

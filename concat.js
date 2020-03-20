const concat               = require('rxjs').concat;
const merge                = require('rxjs').merge;
const of                   = require('rxjs').of;
const timer                = require('rxjs').timer;
const flatMap              = require('rxjs/operators').flatMap;
const concatMap            = require('rxjs/operators').concatMap;
const map                  = require('rxjs/operators').map;
const mapTo                = require('rxjs/operators').mapTo;
const take                 = require('rxjs/operators').take;
const takeLast             = require('rxjs/operators').takeLast;
const tap                  = require('rxjs/operators').tap;
const ignoreElements       = require('rxjs/operators').ignoreElements;
const skip                 = require('rxjs/operators').skip;
const last                 = require('rxjs/operators').last;
const distinct             = require('rxjs/operators').distinct;
const distinctUntilChanged = require('rxjs/operators').distinctUntilChanged;

const o$ = timer(30).pipe(mapTo('Outer'));

timer(0, 10).pipe(
    map(i => `Inner ${i}`),
    // flatMap(r => concat(o$.pipe(ignoreElements()), of(r))),
    flatMap(r => concat(o$, of(r))),
    take(10),
    tap(console.log)
).subscribe();
/**
 Outer
 Inner 0
 Outer
 Inner 1
 Outer
 Inner 2
 Outer
 Inner 3
 Outer
 Inner 4
 */

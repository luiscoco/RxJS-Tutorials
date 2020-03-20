const concat               = require('rxjs').concat;
const combineLatest        = require('rxjs').combineLatest;
const merge                = require('rxjs').merge;
const of                   = require('rxjs').of;
const startWith            = require('rxjs/operators').startWith;
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
const filter               = require('rxjs/operators').filter;
const last                 = require('rxjs/operators').last;
const distinct             = require('rxjs/operators').distinct;
const distinctUntilChanged = require('rxjs/operators').distinctUntilChanged;

const o$ = timer(30).pipe(mapTo('Outer'));

timer(0, 10).pipe(
    map(i => `Inner ${i}`),
    flatMap(r => concat(o$, of(r))),
    distinct(),
    take(10),
    tap(console.log)
).subscribe();
/**
 Outer
 Inner 0
 Inner 1
 Inner 2
 Inner 3
 Inner 4
 Inner 5
 Inner 6
 Inner 7
 Inner 8
 */


// const o$ = timer(30).pipe(mapTo({a: 1, b:2}));
//
// timer(0, 10).pipe(
//     map(i => ({a: i, b: 2})),
//     flatMap(r => concat(o$, of(r))),
//     distinct(),
//     take(10),
//     tap(console.log)
// ).subscribe();
/**
 { a: 1, b: 2 }
 { a: 0, b: 2 }
 { a: 1, b: 2 }
 { a: 2, b: 2 }
 { a: 3, b: 2 }
 { a: 4, b: 2 }
 { a: 5, b: 2 }
 { a: 6, b: 2 }
 { a: 7, b: 2 }
 { a: 8, b: 2 }
  */

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

timer(0, 1000).pipe(
    flatMap((v, i) => {
        if (i === 0) {
            console.log('do sth for the first emit')
        }
        return [v];
    }),
    take(6),
    tap(console.log)
).subscribe();

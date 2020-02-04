const Rx       = require('rxjs/Rx');
const race     = require('rxjs/observable/race').race;
const interval = require('rxjs/observable/interval').interval;
const tap      = require('rxjs/operators/tap').tap;
const map      = require('rxjs/operators/map').map;
const take     = require('rxjs/operators/take').take;
const of       = require('rxjs/observable/of').of;
const mergeMap = require('rxjs/operators/mergeMap').mergeMap;
require('rxjs/add/operator/delay');

const o1 = interval(1000).pipe(map(_ => `A ${_}`));
const o2 = interval(800).pipe(map(_ => `B ${_}`));
const o3 = Rx.Observable.create(subscriber => {
    of('C 1')
        .delay(700)
        .subscribe(_ => subscriber.next(_));
    of('C 2')
        .delay(1400)
        .subscribe(_ => subscriber.next(_));
    of('C 3')
        .delay(1600)
        .subscribe(_ => subscriber.next(_));
});

race([o1, o2, o3])
    .pipe(
        tap(console.log),
        take(2),
        mergeMap(_ => of(`Calling ${_}, which should be called twice.`).delay(5000)),
        tap(console.log),
    )
    .subscribe();

/**
 C 1
 C 2
 Calling C 1, which should be called twice.
 Calling C 2, which should be called twice.
 */

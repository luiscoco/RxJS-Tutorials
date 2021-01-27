const timer     = require('rxjs').timer;
const flatMap   = require('rxjs/operators').flatMap;
const first     = require('rxjs/operators').first;
const tap       = require('rxjs/operators').tap;
const take      = require('rxjs/operators').take;
const takeUntil = require('rxjs/operators').takeUntil;
const catchError = require('rxjs/operators').catchError;
const from = require('rxjs').from;
const Subject = require('rxjs/Subject').Subject;

const waitingSthToHappen = timer(6000); // in this example, it's in 6 seconds.
// in practice, it can be a button pressed by a user. A tear down of an object and component.


timer(0, 1000).pipe(
    takeUntil(waitingSthToHappen),
    tap(console.log)
).subscribe();

// It doesn't necessarily need to have completed.
const subject$ = new Subject();
timer(3000).pipe(tap(() => subject$.next())).subscribe()

timer(0, 1000).pipe(
    takeUntil(subject$),
    tap(r => console.warn(r))
).subscribe();

const subject$ = new Subject();
timer(3000).pipe(tap(() => {
    subject$.error('stop a');
})).subscribe();
timer(0, 6000).pipe(
    takeUntil(subject$),
    takeUntil(from(new Promise(((resolve, reject) => {
        setTimeout(() => reject('error a'), 3000);
    })))),
    // catchError(e => {
    //     console.error(e);
    //     return [null];
    // }),
    tap(console.log)
).subscribe(()=>{}, e => console.error('error', e))
/**
 0
 error stop a
**/
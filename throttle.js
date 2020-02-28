// filter, only first

const Observable = require('rxjs/Observable').Observable;
require('rxjs/add/operator/throttle');
require('rxjs/add/observable/of');
require('rxjs/add/observable/never');
const timer    = require('rxjs/observable/timer').timer;
const throttle = require('rxjs/operators').throttle;
const tap      = require('rxjs/operators').tap;
const flatMap  = require('rxjs/operators').flatMap;

const o = Observable.create((subscriber) => {
    subscriber.next('a1'); // fire
    subscriber.next('a2'); // ignored
    setTimeout(function () {
        subscriber.next('b1'); // ignored
        subscriber.next('b2'); // ignored
    }, 400);
    setTimeout(function () {
        subscriber.next('c1'); // ignored
        subscriber.next('c2'); // ignored
    }, 800);
    // 1000ms passed
    setTimeout(function () {
        subscriber.next('d1'); // fire
        subscriber.next('d2'); // ignored
    }, 1200); // 1200 ms passed, count another 1000ms from here
    setTimeout(function () {
        subscriber.next('e1'); // ignored
        subscriber.next('e2'); // ignored
    }, 1600);
    setTimeout(function () {
        subscriber.next('f1'); // ignored
        subscriber.next('f2'); // ignored
    }, 2000);
    // 2200 ms passed
    setTimeout(function () {
        subscriber.next('g1'); // fire
        subscriber.next('g2'); // ignored
    }, 2400);

}).throttle(val => {
    let t = 1000;
    return timer(t);
});

o.subscribe(console.log); // a1, d1, g1

// ======================  An example that not works as expected ======================
// const api = () => Observable.create(subscriber => {
//     console.log('calling api');
//     timer(5000).subscribe(() => subscriber.next('emit value.'));
// });
//
// let hasValue  = false;
// const request = () => Observable.of(1).pipe(
//     tap(v => hasValue = false),
//     flatMap(() => api()),
//     tap(v => hasValue = true),
// );
//
// timer(0, 1000)
//     .pipe(
//         throttle(() => {
//             console.error('calling throttle', hasValue);
//             return hasValue ? timer(0) : timer(100);
//         }),
//     )
//     .subscribe(() => request().subscribe(console.warn));

// ====================== Instead ======================
// let calling  = false;
// const request = () => Observable.of(1).pipe(
//     flatMap(() => {
//         if (calling) {
//             return Observable.never()
//         }
//         calling =true;
//         return api();
//     }),
//     tap(v => calling = false),
// );
//
// timer(0, 1000)
//     .subscribe(() => request().subscribe(console.warn));

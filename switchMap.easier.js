const Observable = require('rxjs/Observable').Observable;
require('rxjs/add/observable/from');
require('rxjs/add/observable/of');
require('rxjs/add/operator/delay');
require('rxjs/add/operator/map');
require('rxjs/add/operator/switchMap');
require('rxjs/add/operator/take');
const tap       = require('rxjs/operators').tap;
const of        = require('rxjs/observable/of').of;
const switchMap = require('rxjs/operators').switchMap;

/**
 * In a nutshell,
 * if a new value arrives before previous values complete, then switchMap will complete all previous observables.
 *
 * 00:01 A arrives
 * 00:01 Do A's inner observable
 * 00:02 B Arrives
 * 00:02 Complete A's inner observable
 * 00:02 Do B's inner observable
 * 00:03 C Arrives
 * 00:03 Complete B's inner observable
 * 00:03 Do C's inner observable
 * 00:05 C's inner observable completes, print Call C
 * 00:06 D Arrives
 * 00:06 Do D's inner observable
 * 00:08 D's inner observable completes, print Call D
 */
new Observable(subscriber => {
    subscriber.next('First event');
    setTimeout(() => {
        subscriber.next('Second event');
    }, 400); // if this value is larger than 500, the result will include Call First event
    setTimeout(() => {
        subscriber.next('Third event');
    }, 950); // Larger than 400 + 500
})
    .pipe(
        tap(_ => console.log(_)),
        switchMap(m => {
            return of(m).delay(500);
        }),
    )
    .subscribe(r => console.log('Call', r));
/**
 First event
 Second event
 Call Second event
 Third event
 Call Third event
**/


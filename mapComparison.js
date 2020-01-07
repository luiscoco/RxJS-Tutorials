/**
 flatMap/mergeMap - creates an Observable immediately for any source item, all previous Observables are kept alive.
    flatMap IS ANOTHER NAME FOR mergeMap - mergeMap method accepts an optional parameter concurrency, which defines how many Observables can be subscribed at the same time
 concatMap - waits for the previous Observable to complete before creating the next one
 switchMap - for any source item, completes the previous Observable and immediately creates the next one
 exhaustMap - source items are ignored while the previous Observable is not completed
 **/
const from = require('rxjs/observable/from').from;
const of   = require('rxjs/observable/of').of;
const tap  = require('rxjs/operators/tap').tap;
const {
          mergeMap,
          flatMap,
          concatMap,
          switchMap,
          exhaustMap
      }    = require('rxjs/operators');

require('rxjs/add/operator/delay');

const start = new Date().getTime();

const example = operator => () =>
    from([0, 1, 2, 3, 4])
        .pipe(
            operator(x => of(x).delay(500))
        )
        .subscribe(_ => console.log(`${_} at ${new Date().getTime() - start} ms.`), () => {
        }, () => console.log(`${operator.name} completed`));

const mm = example(mergeMap);
/**
 * Results
 0 at 506 ms.
 1 at 509 ms.
 2 at 509 ms.
 3 at 510 ms.
 4 at 510 ms.
 mergeMap completed
 */
const fm = example(flatMap);
/**
 * Results
 0 at 506 ms.
 1 at 509 ms.
 2 at 509 ms.
 3 at 510 ms.
 4 at 510 ms.
 mergeMap completed
 */
const cm = example(concatMap);
/**
 * Results
 0 at 505 ms.
 1 at 1008 ms.
 2 at 1509 ms.
 3 at 2010 ms.
 4 at 2510 ms.
 concatMap completed
 */
const sm = example(switchMap);
/**
 * Results
 4 at 507 ms.
 switchMap completed
 */
const em = example(exhaustMap);
/**
 * Results
 0 at 506 ms.
 exhaustMap completed
 */

// mm();
// fm();
// cm();
// sm();
// em();

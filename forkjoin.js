/*
 Not only does forkJoin require all input observables to be completed, but it also returns an observable
 that produces a single value that is an array of the last values produced by the input observables.
 In other words, it waits until the last input observable completes, and then produces a single value and completes.

 In contrast, combineLatest returns an Observable that produces a new value every time the input observables do,
 once all input observables have produced at least one value. This means it could have infinite values and may not
 complete. It also means that the input observables don't have to complete before producing a value.

 */

const of            = require('rxjs/observable/of').of;
const flatMap       = require('rxjs/operators').flatMap;
const Observable    = require('rxjs/observable').Observable;
const forkJoin      = require('rxjs').forkJoin;
const combineLatest = require('rxjs').combineLatest;

const observable = new Observable(subscriber => {
    subscriber.next('First data emitted');
    subscriber.next('Second data emitted');
    console.log('Waiting 3 seconds to complete');
    setTimeout(() => {
        subscriber.complete();
    }, 3000);
});

console.log('Starting ForkJoin');
of('ForkJoin')
    .pipe(
        flatMap(x => forkJoin([of(x), observable]))
    )
    .subscribe(_ => {
        console.log('ForkJoin done', _);

        // ============== CombineLatest ===============
        console.log('Starting CombineLatest');
        of('CombineLatest')
            .pipe(
                flatMap(x => combineLatest([of(x), observable]))
            )
            .subscribe(_ => {
                console.log('CombineLatest done', _);
            });
        // ============== end ===============

    });

/*
 Starting ForkJoin
 Waiting 3 seconds to complete
 ForkJoin done [ 'ForkJoin', 'Second data emitted' ]

 Starting CombineLatest
 CombineLatest done [ 'CombineLatest', 'First data emitted' ]
 CombineLatest done [ 'CombineLatest', 'Second data emitted' ]
 Waiting 3 seconds to complete
 */

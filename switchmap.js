const Observable = require('rxjs/Observable').Observable;
require('rxjs/add/observable/from');
require('rxjs/add/observable/of');
require('rxjs/add/operator/delay');
require('rxjs/add/operator/map');
require('rxjs/add/operator/switchMap');
require('rxjs/add/operator/take');
const tap       = require('rxjs/operators').tap;
const interval  = require('rxjs').interval;
const timer  = require('rxjs').timer;
const switchMap = require('rxjs/operators').switchMap;


function obs() {
    // return Observable.from([1, 2, 3]);
    return Observable.create(s => {
        s.next('a');
        s.next('b');
        setTimeout(() => {
            s.next('c');
        }, 3000);
        setTimeout(() => {
            s.next('d');
            s.complete();
        }, 9000);

        return () => {
            console.log(`outer completed`);
        }
    });
}

function inner(x){
    console.log(`calling inner ${x}`);
    return Observable.create(s => {
        const i$ = interval(1000)
            .take(1)
            .pipe(
                tap(i => console.log(`inside interval ${x}`)) // always the latest interval
            )
            .subscribe(_ => {
                console.log(`fire ${x}`);
                s.next(_);
            }, null, () => {
                console.log(`interval completed ${x}`);
            });

        return () => {
            console.log(`inner completed ${x}`);
            i$.unsubscribe();
        }
    });
}

const subs$ = obs().pipe(
    tap(_ => console.log(`tap ${_}`)),
    switchMap(_ => {
        console.log(`inside switchmap ${_}`);
        return inner(_);
    })
    )
    .subscribe(_ => {
        console.log(`======== next ${_} ========`);
    }, null, () => {
        console.log('======== All completed ========');
    });

`
tap a
inside switchmap a
calling inner a
tap b
inside switchmap b
calling inner b
inner completed a                # cancelled so that one next is not fired. 
inside interval b
fire b
======== next 0 ========
interval completed b
tap c
inside switchmap c
calling inner c
inner completed b
inside interval c
fire c
======== next 0 ========
interval completed c
tap d
inside switchmap d
calling inner d
inner completed c
outer completed
inside interval d
fire d
======== next 0 ========
interval completed d
`;
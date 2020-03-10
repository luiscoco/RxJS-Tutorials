const Observable = require('rxjs/Observable').Observable;
require('rxjs/add/observable/from');
require('rxjs/add/operator/zip');
const tap      = require('rxjs/operators').tap;
const zip      = require('rxjs').zip;
const interval = require('rxjs').interval;

function obs() {
    return Observable.from(['a', 'b', 'c', 'd', 'e']);
}

const d = new Date().getTime();

obs()
    .zip(
        Observable.from(['u', 'v', 'x', 'y', 'z']),
        interval(1000),
        (a, b, c) => '[' + (new Date().getTime() - d) + 'ms] ' + a + ', ' + b + ', ' + c
    )
    .subscribe(_ => console.log(`next ${_}`), null, () => console.log('completed'));

`
next [1008ms] a, u, 0
next [2016ms] b, v, 1
next [3017ms] c, x, 2
next [4018ms] d, y, 3
next [5018ms] e, z, 4
completed
`;

zip(
    obs(),
    obs(),
    obs(),
).subscribe(console.log);
/**
 [ 'a', 'a', 'a' ]
 [ 'b', 'b', 'b' ]
 [ 'c', 'c', 'c' ]
 [ 'd', 'd', 'd' ]
 [ 'e', 'e', 'e' ]
 */

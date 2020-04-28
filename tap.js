const timer      = require('rxjs').timer;
const tap        = require('rxjs/operators').tap;
const flatMap    = require('rxjs/operators').flatMap;
const first      = require('rxjs/operators').first;
const catchError = require('rxjs/operators').catchError;
const throwError = require('rxjs').throwError;

timer(1000).pipe(
    flatMap(() => throwError(new Error('a'))),
    tap(() => console.log('ok'), err => console.error(err.message), () => console.log('not showing')),
    catchError(() => [null]),
    tap(() => console.log('ok'), err => console.error(err.message), () => console.log('completed')),
).subscribe();
/**
 a
 ok
 completed
**/

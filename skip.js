const Rx   = require('rxjs/Rx');
const of   = require('rxjs/observable/of').of;
const skip = require('rxjs/operators').skip;

of('a', 'b', 'c', 'd')
    .pipe(
        skip(2)
    ).subscribe(console.log); // c d

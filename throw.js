const Observable = require('rxjs/Observable').Observable;
require('rxjs/add/observable/throw');
require('rxjs/add/operator/delay');
require('rxjs/add/operator/materialize');
require('rxjs/add/operator/dematerialize');

Observable.throw(Error('a'))
    .materialize()
    .delay(4000)
    .dematerialize()
    .subscribe(void 0, console.error);
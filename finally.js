const Observable = require('rxjs/Observable').Observable;
require('rxjs/add/observable/throw');
require('rxjs/add/observable/of');
require('rxjs/add/operator/finally');

Observable.throw(Error('a'))
    .finally(() => console.log('run'))
    .subscribe(void 0, e => console.error(e.message));

Observable.of('b')
    .finally(() => console.log('run'))
    .subscribe(result => console.error(result));
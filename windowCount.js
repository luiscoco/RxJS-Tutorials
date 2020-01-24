const Observable = require('rxjs/Observable').Observable;
require('rxjs/add/observable/timer');
require('rxjs/add/observable/from');
require('rxjs/add/operator/map');
require('rxjs/add/operator/mergeAll');
require('rxjs/add/operator/windowTime');
const windowCount = require('rxjs/operators').windowCount;
const tap        = require('rxjs/operators').tap;
const mergeAll   = require('rxjs/operators').mergeAll;
const flatMap   = require('rxjs/operators').flatMap;
const of   = require('rxjs/observable/of').of;


const source = Observable.timer(0, 1000);

source.pipe(
    windowCount(3),
    tap(() => console.log('hello')),
    // tap(subject => console.log(subject)), // we can exploit it to do something regularly after the event in every N times
    // for instance, calculating the current progress
).pipe(mergeAll())
    .subscribe(console.log);

/**
 hello
 0
 1
 2
 hello
 3
 4
 5
 hello
 6
 7
 8
 hello
 9
 **/

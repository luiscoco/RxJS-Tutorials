const BehaviorSubject = require('rxjs/BehaviorSubject').BehaviorSubject;
const debounceTime     = require('rxjs/operators').debounceTime;
const skip            = require('rxjs/operators').skip;
const tap             = require('rxjs/operators').tap;

const subject = new BehaviorSubject(null);

subject.pipe(
    skip(1),
    debounceTime(1000),
    tap(console.log)
).subscribe();

subject.next('1');
setTimeout(() => {
    subject.next('1');
}, 100);


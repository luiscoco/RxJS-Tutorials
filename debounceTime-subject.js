const BehaviorSubject = require('rxjs/BehaviorSubject').BehaviorSubject;
const Subject         = require('rxjs/Subject').Subject;
const debounceTime    = require('rxjs/operators').debounceTime;
const skip            = require('rxjs/operators').skip;
const tap             = require('rxjs/operators').tap;
const take            = require('rxjs/operators').take;
const timer            = require('rxjs').timer;

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


const subject1 = new Subject();

subject1.pipe(
    tap(r => console.log(`Received ${r}`)),
    debounceTime(2000),
    tap(r => console.log(`Done debounced ${r}`))
).subscribe();

timer(0, 1000).pipe(
    take(10),
    tap(i => subject1.next(i))
).subscribe(); // 9 is printed

const Subscription = require('rxjs').Subscription;
const timer        = require('rxjs/observable/timer').timer;
const tap          = require('rxjs/operators').tap;
const of           = require('rxjs/observable/of').of;

const subscription = new Subscription();
subscription.add(
    timer(3000).pipe(tap(() => console.error('First, must have been cancelled.'))).subscribe()
);

subscription.unsubscribe(); // it's cancelled, all subscriptions bound will be unsubscribed despite late comers.
subscription.add(
    timer(2000).pipe(tap(() => console.error('Second, not even can this one been seen.'))).subscribe()
);

const subscription2 = new Subscription();
subscription2.unsubscribe();
subscription2.add(
    timer(0).pipe(tap(() => console.error('This is not printed.'))).subscribe(),
);

subscription2.add(
    of(1).pipe(tap(() => console.error('However, this is printed despite being a later comer.'))).subscribe(),
);

// So, don't do flow control with unsubscribe().

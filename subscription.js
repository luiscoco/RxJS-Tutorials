const Subscription = require('rxjs').Subscription;
const timer = require('rxjs/observable/timer').timer;
const tap       = require('rxjs/operators').tap;

const subscription = new Subscription();
subscription.add(
    timer(3000).pipe(tap(() => console.error('First, must have been cancelled.'))).subscribe()
);

subscription.unsubscribe(); // it's cancelled, all subscriptions bound will be unsubscribed despite late comers.
subscription.add(
    timer(2000).pipe(tap(() => console.log('Second, not even can this one been seen.'))).subscribe()
);

const {of, Observable} = require('rxjs');

const {
          tap,
          retryWhen,
          delay,
          retry,
          mergeMap,
          flatMap,
          catchError,
          take
      }          = require('rxjs/operators');
const timer      = require('rxjs').timer;
const throwError = require('rxjs').throwError;

const genericRetryStrategy = (
    {
        maxRetryAttempts = 3,
        scalingDuration = 1000,
        excludedStatusCodes = []
    } = {}) => (attempts) => {
    return attempts.pipe(
        mergeMap((error, i) => {
            const retryAttempt = i + 1;
            // if maximum number of retries have been met
            // or response is a status code we don't wish to retry, throw error
            if (
                retryAttempt > maxRetryAttempts ||
                excludedStatusCodes.find(e => e === error.status)
            ) {
                return throwError(error);
            }
            console.log(
                `Attempt ${retryAttempt}: retrying in ${retryAttempt *
                scalingDuration}ms`
            );
            // retry after 1s, 2s, etc...
            return timer(retryAttempt * scalingDuration);
        }),
    );
};

let cnt = 0;

function api() {
    return new Observable(subscriber => {
        console.log('calling api');
        cnt++;
        setTimeout(() => {
            if (cnt > 3) {
                subscriber.next('success');
            } else {
                subscriber.error('fail');
            }
        }, 400);
    });
}


api().pipe(
    // retryWhen(genericRetryStrategy()),
    // retry(5),
    retryWhen(errors => errors.pipe(
        flatMap((errMessage, cnt) => {
            return timer((cnt+1) * 1000);
        }),
        take(5) // max attempts
    ))
).subscribe({
    next : console.log,
    error: errorStatus => console.log('Error: ' + errorStatus)
});

const Rx     = require('rxjs/Rx');
const expand = require('rxjs/operators').expand;

// Recursively call provided function.

const source = Rx.Observable
    .of({
        request : {
            page    : 1,
            per_page: 10
        },
        items   : [],
        has_next: true
    })
    .pipe(
        expand(param => {
            // this pattern makes one extra call, so it's necessary to avoid it by using EMPTY
            const res = {
                request : {
                    page    : param.request.page + 1,
                    per_page: param.request.per_page
                },
                items   : {'a': param.request.page},
                has_next: true
            };
            if (param.request.page > 10) {
                res.has_next = false;
            }
            return Rx.Observable.of(res).delay(1000);
        })
    )
    .takeWhile(v => {
        return v.has_next;
    })
    .startWith([])
    .scan((all, cur) => all.concat(cur))
    .takeLast(1);


source.subscribe(_ => {
    console.log(_);
}, console.log, () => {
    console.log('Completed');
});

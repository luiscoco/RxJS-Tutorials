const Rx     = require('rxjs/Rx');
const expand = require('rxjs/operators').expand;

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
            const res = {
                request : {
                    page    : param.request.page + 1,
                    per_page: param.request.per_page
                },
                items   : param.items.concat([{'a': param.request.page}]),
                has_next: true
            };
            if (param.request.page > 10) {
                res.has_next = false;
            }
            return Rx.Observable.of(res).delay(100);
        })
    )
    .takeWhile(v => {
        return v.has_next;
    });

source.subscribe(console.log);
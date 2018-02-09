import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/timeInterval';
import 'rxjs/add/operator/take';

// simply type tsc
// tsconfig.json will be ignored if file is specified

let source = Observable
    .interval(1000 /* ms */)
    .timeInterval()
    .take(3);

source.subscribe(console.log);


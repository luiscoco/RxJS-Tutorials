const Observable = require('rxjs/Observable').Observable;
require('rxjs/add/observable/from');

Observable.from([1,2,3,4]).subscribe(console.log); // 1, 2, 3, 4
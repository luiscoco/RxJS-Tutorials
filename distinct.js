const timer                = require('rxjs').timer;
const map                  = require('rxjs/operators').map;
const take                 = require('rxjs/operators').take;
const tap                  = require('rxjs/operators').tap;
const distinct             = require('rxjs/operators').distinct;

// Use a choosing key which can be a composite key

const items = [
    {index: 0, value: 1},
    {index: 0, value: 2},
    {index: 1, value: 2},
    {index: 2, value: 3},
    {index: 3, value: 4},
    {index: 4, value: 5},
    {index: 5, value: 6},
];

const o$ = timer(0, 1000).pipe(map(i => items[i]));

o$.pipe(
    distinct(item => `${item.index} ${item.value}`),
    tap(console.log),
    take(5)
).subscribe();
/**
 { index: 0, value: 1 }
 { index: 0, value: 2 }
 { index: 1, value: 2 }
 { index: 2, value: 3 }
 { index: 3, value: 4 }
 */

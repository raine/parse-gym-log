# parse-gym-log

Parse text-based workout log file

## example

### input

```
20.04.2018
==========

# squat

5 x 100kg
5 x 100kg

# overhead press

5 x 50kg
5 x 50kg
5 x 50kg

# bench press

3 x 5 x 100kg
```

### output

``` js
[ { date: '20.04.2018',
    exercises:
     [ { exercise: 'squat',
         sets:
          [ { reps: 5, weight: 100 },
            { reps: 5, weight: 100 } ] },
       { exercise: 'overhead press',
         sets:
          [ { reps: 5, weight: 50 },
            { reps: 5, weight: 50 },
            { reps: 5, weight: 50 } ] },
       { exercise: 'bench press',
         sets:
          [ { reps: 5, weight: 100 },
            { reps: 5, weight: 100 },
            { reps: 5, weight: 100 } ] } ] } ]
```

### usage

```js
const parse = require('parse-gym-log')
parse(input)
```

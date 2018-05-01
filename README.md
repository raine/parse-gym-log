# parse-gym-log

Parse a text-based workout log file

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

```js
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

## example usage

```js
const parse = require('parse-gym-log')
const input = require('fs').readFileSync('my-workout-log.txt', 'utf8')
console.log(parse(input))
```

## cli

Using `parse-gym-log` on the command-line will output the log in JSON format.

```sh
$ npm install -g parse-gym-log
$ cat log.txt | parse-gym-log
```

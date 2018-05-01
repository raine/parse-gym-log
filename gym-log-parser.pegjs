{
  function repeat(n, x) {
    return Array.from(Array(n), (_, i) => x)
  }

  function unnest(arr) {
    return arr.reduce((acc, x) => acc.concat(x), [])
  }
}

start
  = workout+

workout
  = date:date_header
    exercises:exercise_block+
    { return ({ date, exercises }) }

exercise_block
  = exercise:exercise_header newline+
    sets:exercise_row+
    { return ({ exercise, sets: unnest(sets) })}

exercise_header
  = '#' _ e:exercise { return e }

exercise_row
  = sets:sets _ 'x' _ reps:reps _ 'x' _ weight:weight newline*
    { return repeat(sets, ({ reps, weight })) }
  / reps:reps _ 'x' _ weight:weight newline*
    { return ({ reps, weight }) }

exercise
  = xs:word+ { return xs.join(' ') }

sets
  = digits

reps
  = digits

weight
  =  w:$(digit+) ('kg' / 'lbs')? { return parseInt(w) }

date_header
  = d:date '\n' [=]+ newline+ { return d }

date
  = $(digit digit date_separator digit digit date_separator digit digit digit digit)
  / $(digit digit digit digit date_separator digit digit date_separator digit digit)

date_separator
  = '/'
  / '.'

digits
  = x:$(digit+) { return parseInt(x) }

digit 'digit'
  = [0-9]

_ 'whitespace'
  = [ ]

word 'word'
  = w:$(letter+) _* { return w }

letter 'letter'
  = [0-9A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02af\u1d00-\u1d25\u1d62-\u1d65\u1d6b-\u1d77\u1d79-\u1d9a\u1e00-\u1eff\u2090-\u2094\u2184-\u2184\u2488-\u2490\u271d-\u271d\u2c60-\u2c7c\u2c7e-\u2c7f\ua722-\ua76f\ua771-\ua787\ua78b-\ua78c\ua7fb-\ua7ff\ufb00-\ufb06]

newline 'line ending'
  = [\n]

end 'end of input'
  = !.

const test = require('ava')
const parse = require('./index')
const d = require('dedent')

test('single exercise', (t) => {
  const input = d`
    20.04.2017
    ==========

    # squat

    5 x 100
    5 x 100
    `

  t.deepEqual(parse(input), [
    {
      date: '20.04.2017',
      exercises: [
        {
          exercise: 'squat',
          sets: [
            {
              reps: 5,
              weight: 100
            },
            {
              reps: 5,
              weight: 100
            }
          ]
        }
      ]
    }
  ])
})

test('multiple exercises', (t) => {
  const input = d`
    20.04.2017
    ==========

    # squat

    5 x 100

    # deadlift

    5 x 150
    `

  t.deepEqual(parse(input), [
    {
      date: '20.04.2017',
      exercises: [
        {
          exercise: 'squat',
          sets: [
            {
              reps: 5,
              weight: 100
            }
          ]
        },
        {
          exercise: 'deadlift',
          sets: [
            {
              reps: 5,
              weight: 150
            }
          ]
        }
      ]
    }
  ])
})

test('parses multiple sets from single line', (t) => {
  const input = d`
    20.04.2017
    ==========

    # squat

    3 x 5 x 100
    `

  t.deepEqual(parse(input), [
    {
      date: '20.04.2017',
      exercises: [
        {
          exercise: 'squat',
          sets: [
            {
              reps: 5,
              weight: 100
            },
            {
              reps: 5,
              weight: 100
            },
            {
              reps: 5,
              weight: 100
            }
          ]
        }
      ]
    }
  ])
})

test('allows mass unit', (t) => {
  const input = d`
    20.04.2017
    ==========

    # squat

    5 x 100kg
    `

  t.deepEqual(parse(input), [
    {
      date: '20.04.2017',
      exercises: [
        {
          exercise: 'squat',
          sets: [
            {
              reps: 5,
              weight: 100
            }
          ]
        }
      ]
    }
  ])
})

test('allows multiple date formats', (t) => {
  const input = d`
    20.04.2017
    ==========

    # squat

    5 x 100

    20/04/2017
    ==========

    # squat

    5 x 100

    2017/04/20
    ==========

    # squat

    5 x 100
    `

  t.deepEqual(parse(input), [
    {
      date: '20.04.2017',
      exercises: [
        {
          exercise: 'squat',
          sets: [
            {
              reps: 5,
              weight: 100
            }
          ]
        }
      ]
    },
    {
      date: '20/04/2017',
      exercises: [
        {
          exercise: 'squat',
          sets: [
            {
              reps: 5,
              weight: 100
            }
          ]
        }
      ]
    },
    {
      date: '2017/04/20',
      exercises: [
        {
          exercise: 'squat',
          sets: [
            {
              reps: 5,
              weight: 100
            }
          ]
        }
      ]
    }
  ])
})

const data = [
  {
      "id": 1,
      "time": "12pm",
      "interview": {
          "student": "friedi k",
          "interviewer": 2
      }
  },
  {
      "id": 2,
      "time": "1pm",
      "interview": {
          "student": "fried",
          "interviewer": 8
      }
  },
  {
      "id": 3,
      "time": "2pm",
      "interview": null
  },
  {
      "id": 4,
      "time": "3pm",
      "interview": null
  },
  {
      "id": 5,
      "time": "4pm",
      "interview": {
          "student": "mai",
          "interviewer": 7
      }
  }
]
//15
const a = [1,2,3,4,5].reduce((a, v) => {
  // console.log(a)
  // console.log('\t', v)
  return a + v
}, 0)

const b = data.reduce((accumulator, appoint) => {
  if (!appoint.interview) {
    return accumulator += 1
  } else {
    return accumulator += 0
  }
}, 0)

console.log(b)
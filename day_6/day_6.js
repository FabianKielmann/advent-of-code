const fs = require('fs')
const puzzle_input = fs.readFileSync(__dirname + '/input.txt', 'utf8')

let data = puzzle_input.split(',').map(el => parseInt(el))

let DAYS = 80

for (let i = 0; i < DAYS; i++) {
  let newborns = []

  data.forEach((fish, fishIdx) => {
    switch (fish) {
      case 0:
        data[fishIdx] = 6
        newborns.push(8)
        break
      default:
        data[fishIdx]--
        break
    }
  })

  // Append newborns
  data = [...data, ...newborns]
  console.log(`After ${i<9 ? ' ' : ''}${i+1} day${i===0 ? ' ' : 's'}: \x1b[33m${data.length}\x1b[0m fish.`)
}

console.log('===')
console.log(`After ${DAYS} days there are \x1b[32m${data.length}\x1b[0m lanternfish.`)
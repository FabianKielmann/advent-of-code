const fs = require('fs')
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8')

const data = input.split('\r\n').map(line => line.split(' | ').map(line => line.split(' ')))

let count = 0

data.forEach(note => {
  const output = note[1]
  output.forEach(value => {
    switch (value.length) {
      case 2: // It's a ONE
        count++
        break

      case 3: // It's a SEVEN
        count++
        break

      case 4: // It's a FOUR
        count++
        break

      case 7: // It's an EIGHT
        count++
        break
    
      default:
        break
    }
  })
})

console.log(`There are \x1b[33m${count}\x1b[0m instances of digits that use a unique number of segments`)
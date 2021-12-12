const fs = require('fs')
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8')

const data = input.split(/\r?\n/).map(num => parseInt(num))

let count = 0

for (let i = 1; i < data.length; i++) {
  if (data[i] > data[i - 1]) count++
}

console.log(`Depth measurements increased \x1b[33m${count}\x1b[0m times.`)
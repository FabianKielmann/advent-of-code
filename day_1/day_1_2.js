const fs = require('fs')
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8')

const data = input.split(/\r?\n/).map(num => parseInt(num))

let count = 0

for (let i = 0; i < data.length; i++) {
  if (i === data.length -3) break

  let window1 = data.slice(i, i + 3).reduce((a, b) => a + b)
  let window2 = data.slice(i + 1, i + 4).reduce((a, b) => a + b)

  if (window2 > window1) count++
}

console.log(`Depth measurement windows of 3 increased \x1b[33m${count}\x1b[0m times.`)
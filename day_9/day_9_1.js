const fs = require('fs')
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8')

const data = input.split('\r\n').map(line => line.split('').map(num => parseInt(num)))

let valids = []

data.forEach((row, y) => {
  row.forEach((col, x) => {
    const lowerThanCurrent = getSurroundings({ x, y }).filter(el => el <= data[y][x])
    if (lowerThanCurrent.length === 0) valids.push(data[y][x])
  })
})

// .map with el + 1 because the risk level is height + 1. Then add all together.
const riskLevelsSum = valids.map(el => el + 1).reduce((prev, next) => next + prev)

console.log(`The risk level sum of all low points is \x1b[33m${riskLevelsSum}\x1b[0m.`)

function getSurroundings(current) {
  const top = { x: current.x + 0, y: current.y + -1 }
  const right = { x: current.x + 1, y: current.y }
  const bottom = { x: current.x, y: current.y + 1 }
  const left = { x: current.x + -1, y: current.y }

  let arr = []

  if (top.y >= 0) arr.push(data[top.y][top.x])
  if (right.x < data[0].length) arr.push(data[right.y][right.x])
  if (bottom.y < data.length) arr.push(data[bottom.y][bottom.x])
  if (left.x >= 0) arr.push(data[left.y][left.x])

  return arr
}
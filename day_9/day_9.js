const fs = require('fs')
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8')

const data = input.split(/\r?\n/).map(line => line.split('').map(num => parseInt(num)))

const lowestLocations = []
const basins = []

// Part 1
data.forEach((row, y) => {
  row.forEach((col, x) => {
    const currentValue = data[y][x]
    const lowerThanCurrent = getSurroundings({ x, y }).filter(el => el.value <= currentValue)
    if (lowerThanCurrent.length === 0) lowestLocations.push({ x, y, value: currentValue })
  })
})

// .map with el + 1 because the risk level is height + 1. Then add all together.
const riskLevelsSum = lowestLocations.map(el => el.value + 1).reduce((prev, next) => next + prev)

console.log(`Part 1: The risk level sum of all low points is \x1b[33m${riskLevelsSum}\x1b[0m.`)

// Part 2
lowestLocations.forEach(lowestLocation => {
  const locationsQueue = [lowestLocation]
  const basin = []

  while (locationsQueue.length > 0) {
    let current = locationsQueue[0];
    const surroundings = getSurroundings(current)
    locationsQueue.splice(0, 1)
    
    surroundings.forEach(el => {
      if (!basin.includes(`${el.x},${el.y}`) && el.value < 9) {
        basin.push(`${el.x},${el.y}`)
        locationsQueue.push(el) 
      }
    })
  }

  basins.push(basin.length)
})

// Multiply together the sizes of the three largest basins
const p2_result = basins.sort((a, b) => a - b).slice(-3).reduce((a, b) => a * b)

console.log(`Part 2: The risk level sum of all low points is \x1b[33m${p2_result}\x1b[0m.`)

function getSurroundings(current) {
  const top = { x: current.x + 0, y: current.y + -1 }
  const right = { x: current.x + 1, y: current.y }
  const bottom = { x: current.x, y: current.y + 1 }
  const left = { x: current.x + -1, y: current.y }

  let arr = Array(4)

  if (top.y >= 0)               arr[0] = { ...top, value: data[top.y][top.x] }
  if (right.x < data[0].length) arr[1] = { ...right, value: data[right.y][right.x] }
  if (bottom.y < data.length)   arr[2] = { ...bottom, value: data[bottom.y][bottom.x] }
  if (left.x >= 0)              arr[3] = { ...left, value: data[left.y][left.x] }

  return arr
}
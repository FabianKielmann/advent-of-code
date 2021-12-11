const fs = require('fs')
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8')

const data = input.split('\r\n').map(line => line.split('').map(num => parseInt(num)))

const lowestLocations = []
const basins = []

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

lowestLocations.forEach(lowestLocation => {
  let basinCount = 1
  const locationsQueue = [lowestLocation]
  const alreadyChecked = []

  while (locationsQueue.length > 0) {
    let current = locationsQueue[0]; // Set current element to the first element in queue
    alreadyChecked.push(`${current.x},${current.y}`) // Add it to the alreadyChecked array
    const surroundings = getSurroundings(current) // Get it's surroundings
    locationsQueue.splice(0, 1) // Remove it from the queue
    
    // Check all surroundings of current location
    surroundings.forEach(el => {
      if (!alreadyChecked.includes(`${el.x},${el.y}`) && el.value < 9) {
        basinCount++ // Increase the basin count
        locationsQueue.push(el) // Push it to the locationsQueue so it's surroundings can be checked next
      }
    })
  }

  basins.push(basinCount)
})

console.table(basins);

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

// function getTop(current) {
//   if (current.y == 0) return false

//   const x = current.x + 0
//   const y = current.y + -1

//   return { x, y, value: data[y][x] }
// }

function copyData() { return data.map(arr => arr.slice()) }

function showBasin(basin) {
  const dataCopy = copyData()

  basin.forEach(el => {
    dataCopy[el.y][el.x] = 'X'
  })

  console.table(dataCopy)
}
const fs = require('fs')
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8')

const data = input.split(/\r?\n/)

let gammaRateArr = new Array(data[0].length).fill(0)

// Loop through to count bits
data.forEach(binaryNum => {
  for (var i = 0; i < binaryNum.length; i++) {
    if (parseInt(binaryNum[i]) === 1) gammaRateArr[i]++
  }
})

// Decide wether each bit should be a 1 or a 0
gammaRateArr.forEach((grBit, grIdx) => {
  gammaRateArr[grIdx] = grBit > (data.length / 2) ? 1 : 0
})

// Convert gamma rate to decimal
const gammaRateDec = parseInt(gammaRateArr.join(''), 2)

// Convert gamma rate to get epsilon rate in binary and finally also convert that to decimal
const epsilonRateDec = parseInt(gammaRateDec ^ 0xfff)

console.log(`The power consumption of the submarine is gammaRate * epsilonRate = \x1b[33m${gammaRateDec * epsilonRateDec}\x1b[0m.`)
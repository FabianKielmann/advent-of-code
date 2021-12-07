const fs = require('fs')
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8')

const data = input.split(',').map(pos => parseInt(pos))

function solvePuzzle(part = 1) {
  let fuelEfficiencyArr = []

  for (let i = 0; i < Math.max(...data); i++) {
    let usedFuel = 0;

    data.forEach(hzPos => {
      let movementCount = Math.abs(hzPos - i)

      let fuelCost = part === 1
        ? movementCount
        : (Math.pow(movementCount, 2) + movementCount) / 2; // https://de.wikipedia.org/wiki/Gau%C3%9Fsche_Summenformel

      usedFuel += fuelCost
    })

    fuelEfficiencyArr.push(usedFuel)
  }

  console.log(`Part ${part}: The most efficient horizontal position to align to costs \x1b[33m${Math.min(...fuelEfficiencyArr)}\x1b[0m fuel.`)
}

solvePuzzle(1);
solvePuzzle(2);
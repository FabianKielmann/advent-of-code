const fs = require('fs')
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8')

const data = input.split('\n')

let oxygenArray = data;
let scrubberArray = data;

for (let i = 0; i < data[0].length; i++) {
  let bitCounter = 0;
  let whichToKeep = null;

  oxygenArray.forEach(oxygenItem => {
    if (parseInt(oxygenItem[i]) === 1) bitCounter++;
  });

  whichToKeep = bitCounter > (oxygenArray.length / 2) ? 1 : 0;
  if (bitCounter === (oxygenArray.length / 2)) whichToKeep = 1;

  if (oxygenArray.length > 1) {
    oxygenArray = oxygenArray.filter(oxygenItem => parseInt(oxygenItem[i]) === whichToKeep);
  }
}

for (let i = 0; i < data[0].length; i++) {
  let bitCounter = 0;
  let whichToKeep = null;

  scrubberArray.forEach(oxygenItem => {
    if (parseInt(oxygenItem[i]) === 1) bitCounter++;
  });

  whichToKeep = bitCounter > (scrubberArray.length / 2) ? 0 : 1;
  if (bitCounter === (scrubberArray.length / 2)) whichToKeep = 0;

  if (scrubberArray.length > 1) {
    scrubberArray = scrubberArray.filter(oxygenItem => parseInt(oxygenItem[i]) === whichToKeep);
  }
}

// Convert oxygenRate to decimal
const oxygenRateDec = parseInt(oxygenArray.join(''), 2)

// Convert scrubberRate to decimal
const scrubberRateDec = parseInt(scrubberArray.join(''), 2)

console.log(`The life support rating of the submarine is oxygenRate * scrubberRate = \x1b[33m${oxygenRateDec * scrubberRateDec}\x1b[0m.`)
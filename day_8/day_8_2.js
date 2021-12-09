// Credits to Jonas Nikolic for helping

const fs = require('fs')
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8')

const data = input.split('\n').map((line) => line.split(' | ')).map(([patterns, outputs]) => [patterns.split(" "), outputs.split(" ")]);

const decodedOutputs = [];

data.forEach(line => {
  const patterns = line[0]
  const outputs = line[1]

  const patternRecognition = Array(10)
  const remainingPatterns = []

  patterns.forEach(pattern => {
    pattern = pattern.split('').sort().join('')

    switch (pattern.length) {
      // It's a ONE
      case 2:
        patternRecognition[1] = pattern.split('')

        break

      // It's a SEVEN
      case 3:
        patternRecognition[7] = pattern.split('')
        break

      // It's a FOUR
      case 4:
        patternRecognition[4] = pattern.split('')
        break

      // It's an EIGHT
      case 7:
        patternRecognition[8] = pattern.split('')
        break
    
      default:
        remainingPatterns.push(pattern)
        break
    }
  })

  const bd = patternRecognition[4].filter(char => char !== patternRecognition[1][0] && char !== patternRecognition[1][1])

  remainingPatterns.forEach(pattern => {
    switch (pattern.length) {
      case 5:
        if (includesAll(pattern, patternRecognition[1])) {
          // if it contains same chars as 1, then it's a 3
          patternRecognition[3] = pattern.split('')
        } else if (includesAll(pattern, bd)) {
          // if it contains same chars as "bd", it's a 5
          patternRecognition[5] = pattern.split('')
        } else {
          // else it's a 2
          patternRecognition[2] = pattern.split('')
        }

        break;

      case 6:
        if (includesAll(pattern, patternRecognition[4])) {
          // if it contains same chars as 4, it's a 9
          patternRecognition[9] = pattern.split('')
        } else if (includesAll(pattern, bd)) {
          // if it contains same chars as "bd", it's a 6
          patternRecognition[6] = pattern.split('')
        } else {
          // else it's a 0
          patternRecognition[0] = pattern.split('')
        }
        break
    
      default:
        break;
    }
  })

  let decodedOutput = []
  outputs.forEach((output, i) => {
    output = output.split('').sort().join('')
    patternRecognition.forEach((pattern, i) => {
      if (pattern.join('') === output) decodedOutput.push(i)
    })
  })
  
  decodedOutputs.push(parseInt(decodedOutput.join('')))
})

console.log(decodedOutputs);

console.log(`There are \x1b[33m${decodedOutputs.reduce((a, b) => a + b)}\x1b[0m instances of digits that use a unique number of segments`)

function includesAll(stringToCheck, requiredCharsArr) {
  let check = true
  requiredCharsArr.forEach(char => {
    if (!stringToCheck.includes(char)) check = false
  })
  return check
}
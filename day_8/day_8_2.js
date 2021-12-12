// Credits to https://github.com/ShedFlu for helping.

const fs = require('fs')
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8')

const data = input.split(/\r?\n/).map((line) => line.split(' | ')).map(([patterns, outputs]) => [patterns.split(' '), outputs.split(' ')])

const lengthMapping = {
  2: 1,
  3: 7,
  4: 4,
  5: null,
  6: null,
  7: 8,
}

const decodedOutputs = []

data.forEach(([patterns, outputs]) => {
  const patternDecoder = Array(10)
  const remainingPatterns = []

  patterns.forEach(pattern => {
    pattern = pattern.split('').sort()

    if (![5, 6].includes(pattern.length)) {
      patternDecoder[lengthMapping[pattern.length]] = pattern
    } else {
      remainingPatterns.push(pattern)
    }
  })

  //      aaaa
  //     b    c
  //     b    c
  //      dddd
  //     e    f
  //     e    f
  //      gggg
  //
  // The above shows why the following const is named "bd"
  const bd = patternDecoder[4].filter(char => char !== patternDecoder[1][0] && char !== patternDecoder[1][1])

  remainingPatterns.forEach(pattern => {
    if (pattern.length === 5) {
      if (includesAll(pattern, patternDecoder[1])) {
        // if it contains same chars as 1, then it's a 3
        patternDecoder[3] = pattern
      } else if (includesAll(pattern, bd)) {
        // if it contains same chars as "bd", it's a 5
        patternDecoder[5] = pattern
      } else {
        // else it's a 2
        patternDecoder[2] = pattern
      }
    } else if (pattern.length === 6) {
      if (includesAll(pattern, patternDecoder[4])) {
        // if it contains same chars as 4, it's a 9
        patternDecoder[9] = pattern
      } else if (includesAll(pattern, bd)) {
        // if it contains same chars as "bd", it's a 6
        patternDecoder[6] = pattern
      } else {
        // else it's a 0
        patternDecoder[0] = pattern
      }
    }
  })

  let decodedOutput = []

  outputs.forEach((output, i) => {
    // Sorting to make it easily comparable
    output = output.split('').sort().join('')

    patternDecoder.forEach((pattern, i) => {
      if (pattern.join('') === output) decodedOutput.push(i)
    })
  })
  
  decodedOutputs.push(parseInt(decodedOutput.join('')))
})

console.log(`The sum of all decoded output values is \x1b[33m${decodedOutputs.reduce((a, b) => a + b)}\x1b[0m.`)

function includesAll(stringToCheck, requiredCharsArr) {
  let check = true

  requiredCharsArr.forEach(char => {
    if (!stringToCheck.includes(char)) check = false
  })

  return check
}
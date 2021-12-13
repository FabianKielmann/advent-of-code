const fs = require('fs')
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8')

const data = input.split(/\r?\n/).map(line => line.split(''))

const pairs = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>'
}

const scores = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137
}

let score = 0

data.forEach((line, idx) => {
  const expectQueue = []
  let corruptedLine = false

  line.forEach(bracket => {
    const matchingBracket = pairs[bracket]

    if (corruptedLine) return

    if (matchingBracket) {

      expectQueue.push(matchingBracket)

    } else { // It's not an opening, but a closing bracket.

      const expectedBracket = expectQueue[expectQueue.length - 1]

      // The next closing bracket in the queue matches the opening one.
      if (bracket === expectedBracket) {

        // Remove the last item from the queue.
        expectQueue.pop()

      // It doesn't. The line is corrupt.
      } else {

        score += scores[bracket]

        console.log(`Expected ${expectedBracket} but found ${bracket} on line ${idx}: ${line.join('')}`)
        corruptedLine = true

      }
    }
  })
})

console.log('=====')
console.log(`Total syntax error score is \x1b[33m${score}\x1b[0m.`)
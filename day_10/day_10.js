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
  ')': { error: 3, completion: 1 },
  ']': { error: 57, completion: 2 },
  '}': { error: 1197, completion: 3 },
  '>': { error: 25137, completion: 4 }
}

const completionList = []
let p1_score = 0
let p2_score = 0

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

        p1_score += scores[bracket].error // Add score for part 1
        
        // console.log(`Expected ${expectedBracket} but found ${bracket} on line ${idx}: ${line.join('')}`, expectQueue.join(''))
        corruptedLine = true

      }
    }
  })

  if (!corruptedLine) {
    // Prepare line completion list for part 2. Left = the given line input, Right = the completion string.
    completionList.push({ left: line, right: expectQueue.reverse(), score: 0 })
  }
})

completionList.forEach(line => {
  line.right.forEach(char => {
    line.score *= 5
    line.score += scores[char].completion
  })
})

console.log(`Part 1: Total syntax error score is \x1b[33m${p1_score}\x1b[0m.`)

completionList.sort((a, b) => a.score - b.score)
p2_score = completionList[Math.floor(completionList.length / 2)].score

console.log(`Part 2: The middle score is \x1b[33m${p2_score}\x1b[0m.`)
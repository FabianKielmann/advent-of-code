const fs = require('fs')
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8')

const data = input.split('\n').map(cmd => cmd.split(' '))

const state = { pos: 0, depth: 0 }

data.forEach(element => {
  const key = element[0]
	const value = parseInt(element[1])

	switch (key) {
		case "forward":
			state.pos += value
			break

		case "up":
      state.depth -= value
      break
	
		case "down":
      state.depth += value
      break
			
		default:
			break
	}
})

console.log(`Part 1: The final horizontal position multiplied by the final depth = \x1b[33m${state.pos * state.depth}\x1b[0m.`)
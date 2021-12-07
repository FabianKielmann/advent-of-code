const fs = require('fs')
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8')

const data = input.split('\n').map(cmd => cmd.split(' '))

const state = { pos: 0, depth: 0, aim: 0 }

data.forEach(element => {
  const key = element[0]
	const value = parseInt(element[1])

	switch (key) {
		case "forward":
			state.pos += value
      state.depth += state.aim * value
			break

		case "up":
      state.aim -= value
      break
	
		case "down":
      state.aim += value
      break
			
		default:
			break
	}
})

console.log(`Part 2: The final horizontal position multiplied by the final depth = \x1b[33m${state.pos * state.depth}\x1b[0m.`)
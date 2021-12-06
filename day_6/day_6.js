const fs = require('fs')
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8')

const data = input.split(',').map(num => parseInt(num))

function solvePuzzle(part = 1) {
	// Filter array to determine amount of fishes with value "val"
	let fishes = []
	fishes.push(data.filter(val => val === 0).length)
	fishes.push(data.filter(val => val === 1).length)
	fishes.push(data.filter(val => val === 2).length)
	fishes.push(data.filter(val => val === 3).length)
	fishes.push(data.filter(val => val === 4).length)
	fishes.push(data.filter(val => val === 5).length)
	fishes.push(data.filter(val => val === 6).length)
	fishes.push(data.filter(val => val === 7).length)
	fishes.push(data.filter(val => val === 8).length)

	let DAYS

	switch (part) {
		case 2:
			DAYS = 256
			break
	
		default:
			DAYS = 80
			break
	}

	// Loop through
	for (let i = 0; i < DAYS; i++) {
		let fishPos1 = fishes[0]
		fishes[0] = fishes[1]
		fishes[1] = fishes[2]
		fishes[2] = fishes[3]
		fishes[3] = fishes[4]
		fishes[4] = fishes[5]
		fishes[5] = fishes[6]
		fishes[6] = fishes[7] + fishPos1
		fishes[7] = fishes[8]
		fishes[8] = fishPos1
	}

	let result = Object.values(fishes).reduce((a, b) => a + b)

	console.log(`Part ${part}: After \x1b[33m${DAYS}\x1b[0m days, there are \x1b[33m${result}\x1b[0m lanternfish.`)
}

solvePuzzle(1)
solvePuzzle(2)
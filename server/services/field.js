const Cell = require('./cell');
const Square = require('./square');
const Column = require('./column');
const Row = require('./row');

class Field {
	constructor() {
		this.cells = [];
		this.fillCells();

		this.checkers = [];
		this.fillParts();
	}

	fillCells = () => {
		for (let i = 0; i < 9; ++i) {
			this.cells.push([]);
			for (let j = 0; j < 9; ++j) {
				this.cells[i].push(new Cell());
			}
		}
	};

	fillParts = () => {
		for (let j = 0; j < 3; ++j) {
			this.checkers.push([]);
			for (let i = 0; i < 9; ++i) {
				let cur =
					j === 0
						? new Square(this.cells, i)
						: j === 1
						? new Column(this.cells, i)
						: new Row(this.cells, i);
				this.checkers[j].push(cur);
			}
		}
	};

	getValues = () => {
		return this.cells.map((row) => row.map((cell) => cell.value));
	};

	checkSolution = () => {
		return this.checkers.every((checker) =>
			checker.every((part) => part.checkPart())
		);
	};
}

module.exports = Field;

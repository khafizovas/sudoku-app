const e = require('express');

const solution = [
	[7, 6, 3, 5, 9, 4, 2, 1, 8],
	[5, 1, 8, 7, 2, 6, 4, 9, 3],
	[2, 9, 4, 3, 8, 1, 7, 6, 5],
	[3, 5, 2, 1, 4, 9, 8, 7, 6],
	[1, 8, 7, 6, 5, 3, 9, 2, 4],
	[6, 4, 9, 2, 7, 8, 5, 3, 1],
	[4, 7, 6, 9, 1, 5, 3, 8, 2],
	[8, 2, 1, 4, 3, 7, 6, 5, 9],
	[9, 3, 5, 8, 6, 2, 1, 4, 7],
];

const task = [
	[null, 6, null, 5, 9, null, 2, 1, null],
	[null, 1, 8, 7, null, null, null, null, 3],
	[null, 9, null, null, null, 1, 7, null, null],
	[3, null, null, 1, null, 9, 8, 7, null],
	[null, 8, null, 6, 5, null, 9, null, 4],
	[6, 4, 9, null, null, 8, 5, null, 1],
	[null, null, null, null, 1, 5, 3, 8, null],
	[8, 2, 1, null, null, null, null, null, null],
	[9, null, null, null, 6, 2, null, null, 7],
];

module.exports = { task, solution };

function randInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Cell {
	constructor(value) {
		this._value = value || NaN;
	}

	set value(value) {
		this._value = value;
	}

	get value() {
		return this._value;
	}
}

class FieldPart {
	constructor(field, filter) {
		this.part = [];

		field.forEach((_, i) => (cell, j) => {
			if (filter(i, j)) {
				this.part.push(cell);
			}
		});
	}

	checkPart = () => {
		return (
			this.part.filter(
				(cell, i, arr) => arr.findIndex((cur) => cur.value === cell.value) === i
			).length === 9
		);
	};
}

class Square extends FieldPart {
	constructor(field, squareInd) {
		super(
			field,
			(i, j) =>
				Math.floor(i / 3) === squareInd && Math.floor(j / 3) === squareInd
		);
	}
}

class Column extends FieldPart {
	constructor(field, colInd) {
		super(field, (_, j) => j === colInd);
	}
}

class Row extends FieldPart {
	constructor(field, rowInd) {
		super(field, (i, _) => i === rowInd);
	}
}

class Field {
	constructor() {
		this.cells = Array(9).fill(Array(9).fill(new Cell()));
		this.checkers = Array(3).fill([]);

		for (let i = 0; i < 3; ++i) {
			this.fillParts(i);
		}
	}

	fillParts = (typeInd) => {
		for (let i = 0; i < 9; ++i) {
			let cur =
				typeInd === 0
					? new Square(this.cells, i)
					: typeInd === 1
					? new Column(this.cells, i)
					: new Row(this.cells, i);
			this.checkers[typeInd].push(cur);
		}
	};

	checkSolution = () => {
		return this.checkers.every((checker) =>
			checker.every((part) => part.checkPart())
		);
	};
}

class RandomField extends Field {
	constructor(complexity) {}

	genBaseField = () => {
		this.cells.forEach((row, i) =>
			row.forEach(
				(cell, j) => (cell.value = ((i * 3 + j + Math.floor(i / 3)) % 9) + 1)
			)
		);
	};

	transpose = () => {
		for (let i = 0; i < 3; ++i) {
			for (let j = 0; j < i; ++j) {
				[field[i][j], field[j][i]] = [field[j][i], field[i][j]];
			}
		}
	};

	swapInArea = (areRows) => {
		const areaOffset = randInt(0, 2) * 3;
		const [lhs, rhs] = [randInt(0, 2), randInt(0, 2)];

		if (areRows) {
			for (
				let i = areaOffset + lhs, k = areaOffset + rhs;
				i < areaOffset + 3 && k < areaOffset + 3;
				++i, ++k
			) {
				for (let j = 0; j < 9; ++j) {
					[this.cells[i][j].value, this.cells[k][j].value] = [
						this.cells[k][j].value,
						this.cells[i][j].value,
					];
				}
			}
		} else {
			for (let i = 0; i < 9; ++i) {
				for (
					let j = areaOffset + lhs, k = areaOffset + rhs;
					j < areaOffset + 3 && k < areaOffset + 3;
					++j, ++k
				) {
					[this.cells[i][j].value, this.cells[i][k].value] = [
						this.cells[i][k].value,
						this.cells[i][j].value,
					];
				}
			}
		}
	};

	swapAreas = (areHorizontal) => {
		const [lhs, rhs] = [randInt(0, 2) * 3, randInt(0, 2) * 3];

		if (areHorizontal) {
			for (let i = 0; i < 3; ++i) {
				for (let j = 0; j < 9; ++j) {
					[this.cells[lhs + i][j], this.cells[rhs + i][j]] = [
						this.cells[rhs + i][j],
						this.cells[lhs + i][j],
					];
				}
			}
		} else {
			for (let i = 0; i < 9; ++i) {
				for (let j = 0; j < 3; ++j) {
					[this.cells[i][lhs + j], this.cells[i][rhs + j]] = [
						this.cells[i][rhs + j],
						this.cells[i][lhs + j],
					];
				}
			}
		}
	};

	shuffleField = () => {
		for (let i = 0; i < 1000; ++i) {
			const funcInd = randInt(0, 2);

			switch (funcInd) {
				case 0:
					this.transpose();
					break;
				case 1:
					this.swapInArea(randInt(0, 1));
					break;
				case 2:
					this.swapAreas(randInt(0, 1));
			}
		}
	};

	deleteCells = (complexity) => {};

	freezePrefilled = () => {};
}

// module.exports = RandomField;

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

class Cell {
	constructor(value) {
		this._value = value;
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
	constructor(field) {}
}

class Column extends FieldPart {
	constructor(field) {}
}

class Row extends FieldPart {
	constructor(field, rowInd) {
		super(field, (i, _) => i === rowInd);
	}
}

class Field {
	constructor() {}

	checkSolution = () => {};
}

class RandomField extends Field {
	constructor(complexity) {}

	genBaseField = () => {};

	transpose = (field) => {};

	swapInArea = (field, areRows) => {};

	swapAreas = (field, areHorizontal) => {};

	shuffleField = (field) => {};

	deleteCells = (field, complexity) => {};

	freezePrefilled = (field) => {};
}

// module.exports = RandomField;

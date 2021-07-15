function randInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const COMPLEXITY_TO_EMPTY_CELLS = {
	2: [56, 57, 58, 59, 60],
	1: [51, 52, 53, 54, 55],
	0: [46, 47, 48, 49, 50],
};

class Cell {
	constructor(value) {
		this._value = value || '';
		this.isMutable = true;
	}

	set value(value) {
		if (!this.isMutable && value !== this._value) {
			throw new Error('Trying to change immutable cell');
		}

		if (!value.toString().match(/^\d$/) && value !== '') {
			throw new TypeError('Invalid cell value');
		}

		this._value = value;
	}

	get value() {
		return this._value;
	}
}

class FieldPart {
	constructor(field, filter) {
		this.part = [];

		field.forEach((row, i) =>
			row.forEach((cell, j) => {
				if (filter(i, j)) {
					this.part.push(cell);
				}
			})
		);
	}

	checkPart = () => {
		return (
			this.part.filter(
				(cell, i, arr) =>
					cell.value !== '' &&
					arr.findIndex((cur) => cur.value === cell.value) === i
			).length === 9
		);
	};
}

class Square extends FieldPart {
	constructor(field, squareInd) {
		super(
			field,
			(i, j) => 3 * Math.floor(i / 3) + Math.floor(j / 3) === squareInd
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

class RandomField extends Field {
	constructor(complexity) {
		super();

		this.genBaseField();
		this.shuffleField();

		this.hints = this.getValues();

		this.deleteCells(complexity);
		this.freezePrefilled();
	}

	genBaseField = () => {
		this.cells.forEach((row, i) =>
			row.forEach(
				(cell, j) => (cell.value = ((i * 3 + j + Math.floor(i / 3)) % 9) + 1)
			)
		);
	};

	transpose = () => {
		for (let i = 0; i < 9; ++i) {
			for (let j = 0; j < i; ++j) {
				[this.cells[i][j].value, this.cells[j][i].value] = [
					this.cells[j][i].value,
					this.cells[i][j].value,
				];
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
					[this.cells[lhs + i][j].value, this.cells[rhs + i][j].value] = [
						this.cells[rhs + i][j].value,
						this.cells[lhs + i][j].value,
					];
				}
			}
		} else {
			for (let i = 0; i < 9; ++i) {
				for (let j = 0; j < 3; ++j) {
					[this.cells[i][lhs + j].value, this.cells[i][rhs + j].value] = [
						this.cells[i][rhs + j].value,
						this.cells[i][lhs + j].value,
					];
				}
			}
		}
	};

	shuffleField = () => {
		for (let i = 0; i < 10; ++i) {
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

	deleteCells = (complexity) => {
		let deleteCount = randInt(
			COMPLEXITY_TO_EMPTY_CELLS[complexity][0],
			COMPLEXITY_TO_EMPTY_CELLS[complexity][4]
		);
		while (deleteCount) {
			const [i, j] = [randInt(0, 8), randInt(0, 8)];
			deleteCount -= this.cells[i][j].value ? 1 : 0;
			this.cells[i][j].value = '';
		}
	};

	freezePrefilled = () => {
		this.cells.forEach((row) =>
			row.forEach((cell) => (cell.isMutable = !cell.value))
		);
	};
}

module.exports = RandomField;

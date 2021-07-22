const Field = require('./field');
const [randInt, COMPLEXITY_TO_EMPTY_CELLS] = require('./helpers');

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

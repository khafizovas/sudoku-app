const Field = require('./field');

Math.randIntRange = function (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

class RandomField extends Field {
	constructor(complexity) {
		super();

		this.COMPLEXITY_TO_EMPTY_CELLS = {
			hard: { min: 56, max: 60 },
			medium: { min: 51, max: 55 },
			easy: { min: 46, max: 50 },
			test: { min: 1, max: 1 },
		};

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
		const areaOffset = Math.randIntRange(0, 2) * 3;
		const [lhs, rhs] = [Math.randIntRange(0, 2), Math.randIntRange(0, 2)];

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
		const [lhs, rhs] = [
			Math.randIntRange(0, 2) * 3,
			Math.randIntRange(0, 2) * 3,
		];

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
			const funcInd = Math.randIntRange(0, 2);

			switch (funcInd) {
				case 0:
					this.transpose();
					break;
				case 1:
					this.swapInArea(Math.randIntRange(0, 1));
					break;
				case 2:
					this.swapAreas(Math.randIntRange(0, 1));
			}
		}
	};

	deleteCells = (complexity) => {
		let deleteCount = Math.randIntRange(
			this.COMPLEXITY_TO_EMPTY_CELLS[complexity].min,
			this.COMPLEXITY_TO_EMPTY_CELLS[complexity].max
		);
		while (deleteCount) {
			const [i, j] = [Math.randIntRange(0, 8), Math.randIntRange(0, 8)];
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

const Sudoku = require('../services/randomfield');
let curSudoku;

const newGame = function (req, res) {
	curSudoku = new Sudoku(req.query.complexity);

	res.json({
		task: curSudoku.getValues(),
	});
};

const check = function (req, res) {
	req.body.solution.forEach((row, i) =>
		row.forEach((cell, j) => (curSudoku.cells[i][j].value = cell))
	);

	res.json({
		isCorrect: curSudoku.checkSolution(),
	});
};

const hint = function (req, res) {
	res.json({
		value: curSudoku.hints[req.body.cell.x][req.body.cell.y],
	});
};

module.exports = {
	newGame,
	check,
	hint,
};

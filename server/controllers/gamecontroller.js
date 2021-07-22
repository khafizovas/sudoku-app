const Sudoku = require('../services/randomfield');
const data = require('../data');

const newSession = function (req, res) {
	res.json({
		token: Date.now() + Math.floor(Math.random() * 1000000),
	});
};

const closeSession = function (req, res) {
	console.log(req.body.token);
	delete data[req.body.token];
};

const newGame = function (req, res) {
	data[req.body.token] = new Sudoku(req.body.complexity);

	res.json({
		task: data[req.body.token].getValues(),
	});
};

const check = function (req, res) {
	req.body.solution.forEach((row, i) =>
		row.forEach((cell, j) => (data[req.body.token].cells[i][j].value = cell))
	);

	res.json({
		isCorrect: data[req.body.token].checkSolution(),
	});
};

const hint = function (req, res) {
	res.json({
		value: data[req.body.token].hints[req.body.cell.x][req.body.cell.y],
	});
};

module.exports = {
	newSession,
	closeSession,
	newGame,
	check,
	hint,
};

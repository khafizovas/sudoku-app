const express = require('express');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Sudoku = require('./sudoku');
let curSudoku;

app.get('/api/new_game', (req, res) => {
	curSudoku = new Sudoku(parseInt(req.query.complexity));

	res.json({
		task: curSudoku.getValues(),
	});
});

app.post('/api/check', (req, res) => {
	req.body.solution.forEach((row, i) =>
		row.forEach((cell, j) => (curSudoku.cells[i][j].value = cell))
	);

	res.json({
		isCorrect: curSudoku.checkSolution(),
	});
});

app.post('/api/hint', (req, res) => {
	res.json({
		value: JSON.stringify(curSudoku.hints[req.body.cell.x][req.body.cell.y]),
	});
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

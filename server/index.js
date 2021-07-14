const { task, solution } = require('./sudoku.js');
const express = require('express');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/new_game', (req, res) => {
	res.json({ task: task });
});

app.post('/api/check', (req, res) => {
	console.log(JSON.stringify(req.body.solution));
	console.log(JSON.stringify(solution));
	console.log(JSON.stringify(req.body.solution) == JSON.stringify(solution));
	res.json({
		isCorrect: JSON.stringify(req.body.solution) == JSON.stringify(solution),
	});
});

app.post('/api/hint', (req, res) => {
	res.json({
		value: JSON.stringify(solution[req.body.cell.x][req.body.cell.y]),
	});
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

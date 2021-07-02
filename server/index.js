const { task, solution } = require('./sudoku.js');

const express = require('express');

const PORT = process.env.PORT || 3001;

const app = express();

app.get('/api', (req, res) => {
	res.json({ task: task });
});

app.post('/api/check', (req, res) => {
	res.json({
		result: req.body.solution == solution,
	});
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

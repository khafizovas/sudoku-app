const { task, solution } = require('./sudoku.js');
const express = require('express');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
	res.json({ task: task });
});

app.post('/api/check', (req, res) => {
	console.log('check solution', JSON.stringify(req.body.solution));
	res.json({
		isCorrect: JSON.stringify(req.body.solution) == JSON.stringify(solution),
	});
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

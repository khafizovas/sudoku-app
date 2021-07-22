const path = require('path');

const express = require('express');
const app = express();

const routes = require('./routes/gameroute');

app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

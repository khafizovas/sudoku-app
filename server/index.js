const express = require('express');
const app = express();

const routes = require('./routes/gameroute');

app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

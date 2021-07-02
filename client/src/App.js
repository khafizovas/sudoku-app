import React from 'react';
import './App.css';
import Cell from './Cell.js';

function App() {
	const [data, setData] = React.useState(null);

	React.useEffect(() => {
		fetch('/api')
			.then((res) => res.json())
			.then((data) => setData(data.task));
	}, []);

	return (
		<Cell x='0' y='0' value='1' />

		// <div className='App'>
		// 	<p>{!data ? 'No data from server' : JSON.stringify(data)}</p>
		// </div>
	);
}

export default App;

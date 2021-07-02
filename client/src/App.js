import React from 'react';
import './App.css';
import GameField from './GameField.js';

function App() {
	const [data, setData] = React.useState(null);

	React.useEffect(() => {
		fetch('/api')
			.then((res) => res.json())
			.then((data) => {
				setData(data.task);
			});
	}, []);

	return (
		<GameField prefilled={data} />

		// <div className='App'>
		// 	<p>{!data ? 'No data from server' : JSON.stringify(data)}</p>
		// </div>
	);
}

export default App;

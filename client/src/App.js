import React from 'react';
import './App.css';
import GameField from './GameField.js';
import Menu from './Menu';

const App = () => {
	const [data, setData] = React.useState(null);

	React.useEffect(() => {
		fetch('/api')
			.then((res) => res.json())
			.then((data) => {
				setData(data.task);
			});
	}, []);

	return (
		<div id='game'>
			<GameField prefilled={data} />
			<Menu />
			{/* Add stopwatch */}
		</div>

		// <div className='App'>
		// 	<p>{!data ? 'No data from server' : JSON.stringify(data)}</p>
		// </div>
	);
};

export default App;

import React from 'react';
import './App.css';
import Game from './Game';

const App = () => {
	const [data, setData] = React.useState(null);

	React.useEffect(() => {
		fetch('/api')
			.then((res) => res.json())
			.then((data) => {
				setData(data.task);
			});
	}, []);

	return <Game prefilled={data} />;
};

export default App;

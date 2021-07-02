import React from 'react';
import './App.css';

function App() {
	const [data, setData] = React.useState(null);

	React.useEffect(() => {
		fetch('/api')
			.then((res) => res.json())
			.then((data) => setData(data.message));
	}, []);

	return (
		<div className='App'>
			<p>{!data ? 'No data from server' : data}</p>
		</div>
	);
}

export default App;

import React from 'react';
import GameField from './GameField';
import Menu from './Menu';

class Game extends React.Component {
	constructor(props) {
		console.log(props);
		super(props);
		this.state = {
			solution: props.prefilled.slice(0),
		};
	}

	updateSolution = (newSolution) => {
		this.state.setState({ solution: newSolution });
	};

	sendSolution = () => {
		fetch('localhost:3001/api/check', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				solution: this.state.solution,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data.result);
			});
	};

	render() {
		return (
			<div id='game'>
				<GameField
					prefilled={this.props.prefilled}
					updateSolution={() => this.updateSolution}
				/>
				<Menu sendSolution={this.sendSolution} />
				{/* Add stopwatch */}
			</div>
		);
	}
}

export default Game;

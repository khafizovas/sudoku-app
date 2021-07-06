import React from 'react';
import './Game.css';
import GameField from './GameField';
import Menu from './Menu';

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			solution: null,
		};
	}

	changeSolution = (cell, value) => {
		let tmp =
			this.state.solution ||
			JSON.parse(JSON.stringify([...this.props.prefilled]));
		tmp[cell.x][cell.y] = value !== tmp[cell.x][cell.y] ? value : null;

		this.setState({ solution: tmp });
	};

	sendSolution = () => {
		if (
			this.state.solution &&
			this.state.solution.every(
				(row) => !row.filter((elem) => elem === null).length
			)
		) {
			fetch('/api/check', {
				method: 'post',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					solution: this.state.solution,
				}),
			})
				.then((res) => res.json())
				.then((data) => alert(data.isCorrect ? 'You have won!' : 'Try again!'));
		} else {
			alert('Input all cells!');
		}
	};

	resetGame = () => {
		this.setState({
			solution: JSON.parse(JSON.stringify([...this.props.prefilled])),
		});
	};

	getHint = () => {
		// if (
		// 	this.state.selectedCell &&
		// 	!this.props.prefilled[this.state.selectedCell]
		// ) {
		// 	fetch('/api/hint', {
		// 		method: 'post',
		// 		headers: { 'Content-Type': 'application/json' },
		// 		body: JSON.stringify({
		// 			cell: this.state.selectedCell,
		// 		}),
		// 	})
		// 		.then((res) => res.json())
		// 		.then((data) => this.changeSolution(data.value));
		// }
	};

	render() {
		return (
			<div id='game'>
				<GameField
					prefilled={this.props.prefilled}
					solution={this.state.solution}
					handleCellInput={this.changeSolution}
				/>
				<Menu
					sendSolution={this.sendSolution}
					resetGame={this.resetGame}
					getHint={this.getHint}
				/>
			</div>
		);
	}
}

export default Game;

import React from 'react';
import './Game.css';
import GameField from './GameField';
import Menu from './Menu';

class Game extends React.Component {
	constructor() {
		super();
		this.state = {
			prefilled: null,
			solution: null,
		};
	}

	componentDidMount() {
		this.newGame();
	}

	newGame = () => {
		fetch('/api')
			.then((res) => res.json())
			.then((data) => {
				this.setState({
					prefilled: data.task,
					solution: JSON.parse(JSON.stringify([...data.task])),
				});
			});
	};

	changeSolution = (cell, value) => {
		let tmp = this.state.solution;
		tmp[cell.x][cell.y] = value !== tmp[cell.x][cell.y] ? value : null;

		this.setState({ solution: tmp });
	};

	sendSolution = () => {
		if (
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
			solution: JSON.parse(JSON.stringify([...this.state.prefilled])),
		});
	};

	getHint = (cell) => {
		fetch('/api/hint', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				cell: cell,
			}),
		})
			.then((res) => res.json())
			.then((data) => this.changeSolution(cell, parseInt(data.value)));
	};

	render() {
		return (
			<div id='game'>
				<GameField
					prefilled={this.state.prefilled}
					solution={this.state.solution}
					handleCellInput={this.changeSolution}
					getHint={this.getHint}
				/>
				<Menu
					sendSolution={this.sendSolution}
					resetGame={this.resetGame}
					newGame={this.newGame}
				/>
			</div>
		);
	}
}

export default Game;

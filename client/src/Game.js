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
		fetch('/api/new_game')
			.then((res) => res.json())
			.then((data) => {
				this.setState({
					prefilled: data.task,
					solution: JSON.parse(JSON.stringify([...data.task])),
				});
			});
	};

	changeSolution = (cell, value) => {
		this.setState((prevState) => {
			const newSolution = [...prevState.solution];
			newSolution[cell.x][cell.y] = value;
			return { solution: newSolution };
		});
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
			.then((data) => this.changeSolution(cell, parseInt(data.value, 10)));
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

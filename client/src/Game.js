import React from 'react';
import './Game.css';
// import Cell from './Cell';
import Menu from './Menu';
import GameField from './GameField';

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedCell: null,
			solution: null,
		};
	}

	selectCell = (x, y) => {
		this.setState({
			selectedCell: { x: x, y: y },
		});
	};

	changeSolution = (value) => {
		if (this.state.selectedCell) {
			let tmp =
				this.state.solution ||
				JSON.parse(JSON.stringify([...this.props.prefilled]));
			tmp[this.state.selectedCell.x][this.state.selectedCell.y] =
				tmp[this.state.selectedCell.x][this.state.selectedCell.y] !== value
					? parseInt(value)
					: null;
			this.setState({ solution: tmp });
		}
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
		if (
			this.state.selectedCell &&
			!this.props.prefilled[this.state.selectedCell]
		) {
			fetch('/api/hint', {
				method: 'post',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					cell: this.state.selectedCell,
				}),
			})
				.then((res) => res.json())
				.then((data) => this.changeSolution(data.value));
		}
	};

	render() {
		return (
			<div id='game'>
				{/* <div id='game-field'>
					{[...Array(9).keys()].map((x) =>
						[...Array(9).keys()].map((y) => (
							<Cell
								x={x}
								y={y}
								value={
									this.state.solution
										? this.state.solution[x][y]
										: this.props.prefilled
										? this.props.prefilled[x][y]
										: null
								}
								mutable={
									this.props.prefilled ? this.props.prefilled[x][y] : true
								}
								onClick={this.selectCell}
								key={x + y}
							/>
						))
					)}
				</div> */}
				<GameField
					prefilled={this.props.prefilled}
					solution={this.state.solution}
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

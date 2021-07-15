import React from 'react';
import './Game.css';
import GameField from './GameField';
import Menu from './Menu';
import Modal from './Modal';

class Game extends React.Component {
	constructor() {
		super();
		this.state = {
			showModal: false,
			prefilled: '',
			solution: '',
			result: '',
		};
	}

	handleShow = () => {
		this.setState({ showModal: true });
	};

	handleHide = () => {
		this.setState({ showModal: false });
	};

	componentDidMount() {
		this.selectComplexity();
	}

	newGame = (complexity) => {
		fetch(
			'/api/new_game?' +
				new URLSearchParams({
					complexity: complexity,
				})
		)
			.then((res) => res.json())
			.then((data) => {
				this.setState({
					prefilled: data.task,
					solution: JSON.parse(JSON.stringify([...data.task])),
				});
			});
	};

	selectComplexity = () => {
		this.handleShow();
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
				(row) => !row.filter((elem) => elem === '').length
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
				.then((data) =>
					this.setState({
						result: data.isCorrect ? 'You have won!' : 'Try again!',
					})
				);
		} else {
			this.setState({ result: 'Input all cells!' });
		}

		this.handleShow();
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
		const setComplexity =
			this.state.showModal && !this.state.prefilled ? (
				<Modal>
					<p>Select complexity</p>
					<button
						onClick={() => {
							this.handleHide();
							this.newGame(0);
						}}>
						Easy
					</button>
					<button
						onClick={() => {
							this.handleHide();
							this.newGame(1);
						}}>
						Medium
					</button>
					<button
						onClick={() => {
							this.handleHide();
							this.newGame(2);
						}}>
						Hard
					</button>
				</Modal>
			) : null;

		const result =
			this.state.showModal && this.state.result ? (
				<Modal>
					<p>{this.state.result}</p>
					<button
						onClick={() => {
							this.handleHide();
							this.setState({ result: '' });
						}}>
						Continue playing
					</button>
				</Modal>
			) : null;

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
					newGame={() => {
						this.setState({ prefilled: '' });
						this.selectComplexity();
					}}
				/>
				{setComplexity}
				{result}
			</div>
		);
	}
}

export default Game;

import React from 'react';
import './App.css';
import GameField from './GameField';
import Menu from './Menu';
import ComplexityMenu from './ComplexityMenu';
import Result from './Result';

class App extends React.Component {
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

				{this.state.showModal && !this.state.prefilled ? (
					<ComplexityMenu
						handleClick={(complexity) => {
							this.handleHide();
							this.newGame(complexity);
						}}
					/>
				) : null}

				{this.state.showModal && this.state.result ? (
					<Result
						message={this.state.result}
						handleClick={() => {
							this.handleHide();
							this.setState({ result: '' });
						}}
					/>
				) : null}
			</div>
		);
	}
}

export default App;

import React from 'react';

import './App.css';

import GameField from '../GameField/GameField';
import Menu from '../Menu/Menu';
import Login from '../Login/Login';
import ComplexityMenu from '../ComplexityMenu/ComplexityMenu';
import Result from '../Result/Result';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			showModal: false,
			token: '',
			prefilled: '',
			solution: '',
			result: '',
		};
	}

	closeSession = () => {
		fetch('/api/close_session', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				token: this.state.token,
			}),
		});
	};

	componentDidMount() {
		window.addEventListener('beforeunload', this.closeSession);

		this.handleShow();
	}

	handleShow = () => {
		this.setState({ showModal: true });
	};

	handleHide = () => {
		this.setState({ showModal: false });
	};

	newSession = () => {
		fetch('/api/new_session')
			.then((res) => res.json())
			.then((data) => {
				this.setState({ token: data.token });
			});
	};

	newGame = (complexity) => {
		fetch('/api/new_game', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				token: this.state.token,
				complexity: complexity,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				this.setState({
					prefilled: data.task,
					solution: JSON.parse(JSON.stringify(data.task)),
				});
			});
	};

	changeSolution = (cell, value) => {
		this.setState((prevState) => {
			const newSolution = JSON.parse(JSON.stringify(prevState.solution));
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
					token: this.state.token,
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
			solution: JSON.parse(JSON.stringify(this.state.prefilled)),
		});
	};

	getHint = (cell) => {
		fetch('/api/hint', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				token: this.state.token,
				cell: cell,
			}),
		})
			.then((res) => res.json())
			.then((data) => this.changeSolution(cell, parseInt(data.value, 10)));
	};

	render() {
		const modal = this.state.showModal ? (
			!this.state.token ? (
				<Login handleClick={this.newSession} />
			) : !this.state.prefilled ? (
				<ComplexityMenu
					handleClick={(complexity) => {
						this.handleHide();
						this.newGame(complexity);
					}}
				/>
			) : this.state.result ? (
				<Result
					message={this.state.result}
					handleClick={() => {
						this.handleHide();
						this.setState({ result: '' });
					}}
				/>
			) : null
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
						this.handleShow();
					}}
				/>

				{modal}
			</div>
		);
	}
}

export default App;

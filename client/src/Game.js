import React from 'react';
import './Game.css';
import Cell from './Cell';
import InputField from './InputField';
import Menu from './Menu';

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
					? value
					: null;
			this.setState({ solution: tmp });
			// this.props.updateSolution(this.state.solution);
		}
	};

	sendSolution = () => {
		// if (
		// 	this.state.solution &&
		// 	this.state.solution.every(
		// 		(row) => !row.filter((elem) => elem === null).length
		// 	)
		// ) {
		fetch('/api/check', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				solution: this.state.solution,
			}),
		}).then((data) => {
			console.log(data);
		});
		// } else {
		// 	alert('Input all cells!');
		// }
	};

	render() {
		return (
			<div id='game-field'>
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
							mutable={this.props.prefilled ? this.props.prefilled[x][y] : true}
							onClick={this.selectCell}
							key={x + y}
						/>
					))
				)}
				<InputField
					selectedCell={this.state.selectedCell}
					selectValue={this.changeSolution}
				/>
				<Menu sendSolution={this.sendSolution} />
			</div>
		);
	}
}

export default Game;

import React from 'react';
import './GameField.css';
import Cell from './Cell';

class GameField extends React.Component {
	constructor(props) {
		super(props);
		this.state = { selectedCell: null };
	}

	selectSell = (cell) => {
		this.setState({ selectedCell: cell });
	};

	handleCellInput = (cell, value) => {
		this.props.handleCellInput(cell, value);
		this.selectSell(null);
	};

	getCellHint = (cell) => {
		this.props.getHint(cell);
		this.selectSell(null);
	};

	render() {
		return (
			<div id='game-field'>
				{[...Array(9).keys()].map((x) =>
					[...Array(9).keys()].map((y) => (
						<Cell
							key={x + y}
							cell={{ x: x, y: y }}
							value={this.props.solution ? this.props.solution[x][y] : null}
							mutable={this.props.prefilled ? this.props.prefilled[x][y] : true}
							selectedCell={this.state.selectedCell}
							handleClick={this.selectSell}
							handleInput={this.handleCellInput}
							getHint={this.getCellHint}
						/>
					))
				)}
			</div>
		);
	}
}

export default GameField;

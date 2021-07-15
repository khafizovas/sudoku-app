import React from 'react';
import './GameField.css';
import Cell from './Cell';

class GameField extends React.Component {
	constructor(props) {
		super(props);
		this.state = { selectedCell: null, selectedValue: null };
	}

	selectSell = (cell, value) => {
		this.setState({ selectedCell: cell, selectedValue: value });
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
		const rows = [];
		for (let i = 0; i < 9; ++i) {
			const cells = [];
			for (let j = 0; j < 9; ++j) {
				cells.push(
					<Cell
						id={i * 9 + j}
						key={i * 9 + j}
						cell={{ x: i, y: j }}
						value={this.props.solution ? this.props.solution[i][j] : null}
						mutable={this.props.prefilled ? !this.props.prefilled[i][j] : true}
						selectedCell={this.state.selectedCell}
						selectedValue={this.state.selectedValue}
						handleClick={this.selectSell}
						handleInput={this.handleCellInput}
						getHint={this.getCellHint}
					/>
				);
			}
			rows.push(
				<tr className='field-row' key={i}>
					{cells}
				</tr>
			);
		}

		return (
			<table id='game-field'>
				<tbody>{rows}</tbody>
			</table>
		);
	}
}

export default GameField;

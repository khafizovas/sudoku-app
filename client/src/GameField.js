import React from 'react';
import './GameField.css';
import Cell from './Cell.js';

class GameField extends React.Component {
	render() {
		return (
			<div id='game-field'>
				{[...Array(9).keys()].map((x) =>
					[...Array(9).keys()].map((y) => (
						<Cell x={x} y={y} value={this.props.prefilled[x][y]} />
					))
				)}
			</div>
		);
	}
}

export default GameField;

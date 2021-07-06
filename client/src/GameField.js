import React from 'react';
import Cell from './Cell';

const GameField = (props) => {
	return (
		<div id='game-field'>
			{[...Array(9).keys()].map((x) =>
				[...Array(9).keys()].map((y) => (
					<Cell
						key={x + y}
						cell={{ x: x, y: y }}
						value={
							props.solution
								? props.solution[x][y]
								: props.prefilled
								? props.prefilled[x][y]
								: null
						}
						mutable={props.prefilled ? props.prefilled[x][y] : true}
						handleInput={props.handleCellInput}
					/>
				))
			)}
		</div>
	);
};

export default GameField;

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

	render() {
		return (
			<div id='game-field'>
				{[...Array(9).keys()].map((x) =>
					[...Array(9).keys()].map((y) => (
						<Cell
							key={x + y}
							cell={{ x: x, y: y }}
							value={
								this.props.solution
									? this.props.solution[x][y]
									: this.props.prefilled
									? this.props.prefilled[x][y]
									: null
							}
							mutable={this.props.prefilled ? this.props.prefilled[x][y] : true}
							selectedCell={this.state.selectedCell}
							handleClick={this.selectSell}
							handleInput={this.props.handleCellInput}
							getHint={this.props.getHint}
						/>
					))
				)}
			</div>
		);
	}
}

// const GameField = (props) => {
// 	return (
// 		<div id='game-field'>
// 			{[...Array(9).keys()].map((x) =>
// 				[...Array(9).keys()].map((y) => (
// 					<Cell
// 						key={x + y}
// 						cell={{ x: x, y: y }}
// 						value={
// 							props.solution
// 								? props.solution[x][y]
// 								: props.prefilled
// 								? props.prefilled[x][y]
// 								: null
// 						}
// 						mutable={props.prefilled ? props.prefilled[x][y] : true}
// 						handleInput={props.handleCellInput}
// 						getHint={props.getHint}
// 					/>
// 				))
// 			)}
// 		</div>
// 	);
// };

export default GameField;

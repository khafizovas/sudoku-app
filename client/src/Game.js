import React from 'react';
import GameField from './GameField';
import Menu from './Menu';

class Game extends React.Component {
	render() {
		return (
			<div id='game'>
				<GameField prefilled={this.props.prefilled} />
				<Menu />
				{/* Add stopwatch */}
			</div>
		);
	}
}

export default Game;

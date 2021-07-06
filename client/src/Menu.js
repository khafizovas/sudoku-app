import React from 'react';
import './Menu.css';

const Menu = (props) => {
	return (
		<div id='menu'>
			<button onClick={props.newGame}>New game</button>
			<button onClick={props.resetGame}>Reset</button>
			<button onClick={props.sendSolution}>Send solution</button>
		</div>
	);
};

export default Menu;

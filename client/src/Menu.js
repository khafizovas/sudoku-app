import React from 'react';
import './Menu.css';

const Menu = (props) => {
	return (
		<div id='menu'>
			<button>Hint</button>
			<button onClick={props.resetGame}>Reset</button>
			<button>New game</button>
			<button onClick={props.sendSolution}>Send solution</button>
		</div>
	);
};

export default Menu;

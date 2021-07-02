import React from 'react';
import './Menu.css';

class Menu extends React.Component {
	state = {};

	render() {
		return (
			<div id='menu'>
				<button>Hint</button>
				<button>Reset</button>
				<button>New game</button>
				<button>Send solution</button>
			</div>
		);
	}
}

export default Menu;

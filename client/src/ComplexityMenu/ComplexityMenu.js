import React from 'react';
import Modal from '../Modal/Modal';

const ComplexityMenu = (props) => {
	return (
		<Modal>
			<p>Select complexity</p>
			<button onClick={() => props.handleClick('easy')}>Easy</button>
			<button onClick={() => props.handleClick('medium')}>Medium</button>
			<button onClick={() => props.handleClick('hard')}>Hard</button>
		</Modal>
	);
};

export default ComplexityMenu;

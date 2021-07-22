import React from 'react';
import Modal from '../Modal/Modal';

const ComplexityMenu = (props) => {
	return (
		<Modal>
			<p>Select complexity</p>
			<button onClick={() => props.handleClick(0)}>Easy</button>
			<button onClick={() => props.handleClick(1)}>Medium</button>
			<button onClick={() => props.handleClick(2)}>Hard</button>
		</Modal>
	);
};

export default ComplexityMenu;

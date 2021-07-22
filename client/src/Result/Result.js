import React from 'react';
import Modal from '../Modal/Modal';

const Result = (props) => {
	return (
		<Modal>
			<p>{props.message}</p>
			<button onClick={() => props.handleClick()}>Continue playing</button>
		</Modal>
	);
};

export default Result;

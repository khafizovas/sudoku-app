import React from 'react';
import Modal from '../Modal/Modal';

const Login = (props) => {
	return (
		<Modal>
			<p>Welcome!</p>
			<button onClick={() => props.handleClick()}>New session</button>
		</Modal>
	);
};

export default Login;

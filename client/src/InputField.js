import React from 'react';
import './InputField.css';

class InputField extends React.Component {
	state = {
		isActive: false,
	};

	handleShow = () => {
		this.setState({
			isActive: true,
		});
	};

	handleHide = () => {
		this.setState({
			isActive: false,
		});
	};

	render() {
		return (
			<div id='input-field'>
				{this.state.isActive
					? [...Array(9).keys()].map((i) => (
							<button className='input-cell'>{i + 1}</button>
					  ))
					: null}
			</div>
		);
	}
}

export default InputField;

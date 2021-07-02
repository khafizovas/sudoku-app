import React from 'react';
import './InputField.css';

class InputField extends React.Component {
	render() {
		return (
			<div id='input-field'>
				{[...Array(9).keys()].map((i) => (
					<button
						className='input-cell'
						onClick={() => this.props.selectValue(i + 1)}
					>
						{i + 1}
					</button>
				))}
			</div>
		);
	}
}

export default InputField;

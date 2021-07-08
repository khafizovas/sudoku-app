import React from 'react';
import './InputField.css';

class InputField extends React.Component {
	render() {
		const inputFieldNums = [];

		for (let i = 0; i < 9; ++i) {
			inputFieldNums.push(
				<button
					className='input-cell'
					onClick={() => this.props.handleClick(i + 1)}
					key={i}>
					{i + 1}
				</button>
			);
		}

		return (
			<div id='input-field'>
				{inputFieldNums}
				<button className='input-cell' onClick={this.props.hint}>
					Hint
				</button>
				<button
					className='input-cell'
					onClick={() => this.props.handleClick(null)}>
					Del
				</button>
				<button className='input-cell' onClick={this.props.close}>
					X
				</button>
			</div>
		);
	}
}

export default InputField;

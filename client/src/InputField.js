import React from 'react';
import './InputField.css';

class InputField extends React.Component {
	render() {
		return (
			<div id='input-field'>
				{[...Array(9).keys()].map((i) => (
					<button
						className='input-cell'
						onClick={() => this.props.handleClick(i + 1)}
						key={i}>
						{i + 1}
					</button>
				))}
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

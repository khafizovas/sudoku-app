import React from 'react';
import './Cell.css';
import InputField from './InputField';

class Cell extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isActive: false };
	}

	handleClick = () => {
		this.setState({ isActive: !this.state.isActive });
	};

	inputValue = (value) => {
		this.setState({ isActive: false });
		this.props.handleInput(value);
	};

	render() {
		return (
			<div className='cell'>
				<button
					className='cell-value'
					disabled={this.props.mutable}
					onClick={this.handleClick}>
					{this.props.value}
				</button>
				{this.state.isActive ? (
					<InputField handleClick={this.inputValue} />
				) : null}
			</div>
		);
	}
}

export default Cell;

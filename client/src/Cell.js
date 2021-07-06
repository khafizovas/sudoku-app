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
		this.props.handleInput(this.props.cell, value);
	};

	getHint = () => {
		this.props.getHint(this.props.cell);
		this.setState({ isActive: false });
	};

	closeInput = () => {
		this.setState({ isActive: false });
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
					<InputField
						handleClick={this.inputValue}
						close={this.closeInput}
						hint={this.getHint}
					/>
				) : null}
			</div>
		);
	}
}

export default Cell;

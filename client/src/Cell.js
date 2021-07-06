import React from 'react';
import './Cell.css';
import InputField from './InputField';

class Cell extends React.Component {
	inputValue = (value) => {
		this.props.handleInput(this.props.cell, value);
	};

	getHint = () => {
		this.props.getHint(this.props.cell);
	};

	isSelected = () => {
		return (
			JSON.stringify(this.props.selectedCell) ===
			JSON.stringify(this.props.cell)
		);
	};

	render() {
		return (
			<div className='cell'>
				<button
					className='cell-value'
					disabled={this.props.mutable}
					onClick={() => {
						this.props.handleClick(this.props.cell);
					}}>
					{this.props.value}
				</button>
				{this.isSelected() ? (
					<InputField
						handleClick={this.inputValue}
						close={() => {
							this.props.handleClick(null);
						}}
						hint={this.getHint}
					/>
				) : null}
			</div>
		);
	}
}

export default Cell;

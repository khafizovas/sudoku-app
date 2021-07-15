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

	isInInputArea = () => {
		return this.props.selectedCell
			? this.props.cell.x === this.props.selectedCell.x ||
					this.props.cell.y === this.props.selectedCell.y ||
					(Math.floor(this.props.cell.x / 3) ===
						Math.floor(this.props.selectedCell.x / 3) &&
						Math.floor(this.props.cell.y / 3) ===
							Math.floor(this.props.selectedCell.y / 3))
			: false;
	};

	render() {
		return (
			<td
				className={
					(this.props.mutable ? '' : ' prefilled-cell') +
					(this.isInInputArea() ? ' input-area' : '') +
					(this.isSelected() ? ' selected-cell' : '')
				}
				onClick={
					this.props.mutable
						? () => this.props.handleClick(this.props.cell)
						: null
				}>
				{this.props.value}
				{this.props.mutable && this.isSelected() ? (
					<InputField
						styles={
							'margin-std' +
							(this.props.cell.y > 5 ? ' margin-right' : '') +
							(this.props.cell.x > 4 ? ' margin-bottom ' : '')
						}
						handleClick={this.inputValue}
						close={(e) => {
							e.stopPropagation();
							this.props.handleClick(null);
						}}
						hint={this.getHint}
					/>
				) : null}
			</td>
		);
	}
}

export default Cell;

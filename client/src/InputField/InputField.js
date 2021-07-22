import React from 'react';
import './InputField.css';

class InputField extends React.Component {
	render() {
		const rows = [];

		for (let i = 0; i < 3; ++i) {
			const cells = [];
			for (let j = 0; j < 3; ++j) {
				cells.push(
					<td
						onClick={(e) => {
							e.stopPropagation();
							this.props.handleClick(i * 3 + j + 1);
						}}
						key={i * 3 + j}>
						{i * 3 + j + 1}
					</td>
				);
			}
			rows.push(<tr key={i}>{cells}</tr>);
		}

		rows.push(
			<tr key={3}>
				<td
					onClick={(e) => {
						e.stopPropagation();
						this.props.hint();
					}}>
					Hint
				</td>
				<td
					onClick={(e) => {
						e.stopPropagation();
						this.props.handleClick('');
					}}>
					Del
				</td>
				<td onClick={this.props.close}>X</td>
			</tr>
		);

		return (
			<table id='input-field' className={this.props.styles}>
				<tbody>{rows}</tbody>
			</table>
		);
	}
}

export default InputField;

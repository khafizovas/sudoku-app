import React from 'react';
import './Cell.css';

const Cell = (props) => (
	<button
		className='cell'
		disabled={props.value}
		data-x={props.x}
		data-y={props.y}
	>
		{props.value}
	</button>
);

export default Cell;

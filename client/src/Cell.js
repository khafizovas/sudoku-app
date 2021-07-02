import React from 'react';
import './Cell.css';

const Cell = (props) => (
	<button
		className='cell'
		disabled={props.mutable}
		data-x={props.x}
		data-y={props.y}
		onClick={() => props.onClick(props.x, props.y)}
	>
		{props.value}
	</button>
);

export default Cell;

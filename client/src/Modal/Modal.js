import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const modalRoot = document.getElementById('modal-root');
const appRoot = document.getElementById('app-root');

class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.el = document.createElement('div');
	}

	componentDidMount() {
		modalRoot.appendChild(this.el);

		appRoot.style.filter = 'blur(5px)';
		appRoot.style.pointerEvents = 'none';
	}

	componentWillUnmount() {
		appRoot.style.removeProperty('filter');
		appRoot.style.pointerEvents = 'all';

		modalRoot.removeChild(this.el);
	}

	render() {
		return ReactDOM.createPortal(this.props.children, this.el);
	}
}

export default Modal;

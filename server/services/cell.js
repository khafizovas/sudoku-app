class Cell {
	constructor(value) {
		this._value = value || '';
		this.isMutable = true;
	}

	set value(value) {
		if (!this.isMutable && value !== this._value) {
			throw new Error('Trying to change immutable cell');
		}

		if (!value.toString().match(/^\d$/) && value !== '') {
			throw new TypeError('Invalid cell value');
		}

		this._value = value;
	}

	get value() {
		return this._value;
	}
}

module.exports = Cell;

const FieldPart = require('./fieldpart');

class Row extends FieldPart {
	constructor(field, rowInd) {
		super(field, (i, _) => i === rowInd);
	}
}

module.exports = Row;

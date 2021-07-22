const FieldPart = require('./fieldpart');

class Column extends FieldPart {
	constructor(field, colInd) {
		super(field, (_, j) => j === colInd);
	}
}

module.exports = Column;

const FieldPart = require('./fieldpart');

class Square extends FieldPart {
	constructor(field, squareInd) {
		super(
			field,
			(i, j) => 3 * Math.floor(i / 3) + Math.floor(j / 3) === squareInd
		);
	}
}

module.exports = Square;

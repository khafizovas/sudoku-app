class FieldPart {
	constructor(field, filter) {
		this.part = [];

		field.forEach((row, i) =>
			row.forEach((cell, j) => {
				if (filter(i, j)) {
					this.part.push(cell);
				}
			})
		);
	}

	checkPart = () => {
		return (
			this.part.filter(
				(cell, i, arr) =>
					cell.value !== '' &&
					arr.findIndex((cur) => cur.value === cell.value) === i
			).length === 9
		);
	};
}

module.exports = FieldPart;

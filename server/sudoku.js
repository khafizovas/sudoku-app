const solution = [
	[7, 6, 3, 5, 9, 4, 2, 1, 8],
	[5, 1, 8, 7, 2, 6, 4, 9, 3],
	[2, 9, 4, 3, 8, 1, 7, 6, 5],
	[3, 5, 2, 1, 4, 9, 8, 7, 6],
	[1, 8, 7, 6, 5, 3, 9, 2, 4],
	[6, 4, 9, 2, 7, 8, 5, 3, 1],
	[4, 7, 6, 9, 1, 5, 3, 8, 2],
	[8, 2, 1, 4, 3, 7, 6, 5, 9],
	[9, 3, 5, 8, 6, 2, 1, 4, 7],
];

const task = [
	[null, 6, null, 5, 9, null, 2, 1, null],
	[null, 1, 8, 7, null, null, null, null, 3],
	[null, 9, null, null, null, 1, 7, null, null],
	[3, null, null, 1, null, 9, 8, 7, null],
	[null, 8, null, 6, 5, null, 9, null, 4],
	[6, 4, 9, null, null, 8, 5, null, 1],
	[null, null, null, null, 1, 5, 3, 8, null],
	[8, 2, 1, null, null, null, null, null, null],
	[9, null, null, null, 6, 2, null, null, 7],
];

module.exports = { task, solution };

class Cell {}

class FieldPart {}

class Square extends FieldPart {}

class Column extends FieldPart {}

class Row extends FieldPart {}

class Field {}

class RandomField extends Field {}

// module.exports = RandomField;

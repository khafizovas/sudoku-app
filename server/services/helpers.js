function randInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const COMPLEXITY_TO_EMPTY_CELLS = {
	2: [56, 57, 58, 59, 60],
	1: [51, 52, 53, 54, 55],
	0: [46, 47, 48, 49, 50],
};

module.exports = [randInt, COMPLEXITY_TO_EMPTY_CELLS];

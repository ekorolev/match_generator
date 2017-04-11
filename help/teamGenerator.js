
const playersGenerator = require("./playerGenerator").Generator;
const scheme = [
	     "GK",
"LD", "CD", "CD", "RD",
"LM", "CM", "CM", "RM",
      "CF", "CF"
];

const Generator = options => {
	options = options || {};

	let name		= options.name || "Спортинг-"+(Math.floor(Math.random()*98)+1);

	let players = [];

	for ( let index = 0; index < 11; ++index ) {
		players.push(playersGenerator({position: scheme[index], power: 60}));
	}

	return {
		name,
		players
	};
};

module.exports = Generator;
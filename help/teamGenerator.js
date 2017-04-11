
const playersGenerator = require("./playerGenerator").Generator;
const scheme = [
	     "GK",
"LD", "CD", "CD", "RD",
"LM", "CM", "CM", "RM",
      "CF", "CF"
];

const NAMES = [
	"Спортинг",
	"Атлетико",
	"Зенит",
	"Динамо",
	"Заря",
	"Луч",
	"Каспий",
	"Комсомолец",
	"Локомотив",
	"ЦСКА",
	"Мотор",
	"Уралец"
]

const Generator = options => {
	options = options || {};

	let name		= options.name || NAMES[ Math.floor(Math.random()*NAMES.length)]+"-"+(Math.floor(Math.random()*89)+10);

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
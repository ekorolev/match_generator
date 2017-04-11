
const NAMES = require("./names.json");
const FAMILIES = require("./families.json");
const POWER = { min: 30, max: 100 };
const AGE = { min: 16, max: 36 };
const POSITIONS = [ "GK", "LD", "CD", "RD", "LM", "CM", "RM", "CF" ];

const Generator = options => {

	let name 		= options.names 	|| NAMES[ Math.floor( Math.random() * NAMES.length ) ];
	let family		= options.family	|| FAMILIES[ Math.floor( Math.random() * FAMILIES.length ) ];
	let power		= options.power		|| POWER.min + Math.floor( Math.random() * (POWER.max-POWER.min) );
	let age			= options.age 		|| AGE.min + Math.floor( Math.random() * (AGE.max-AGE.min) );
	let position	= options.position 	|| POSITIONS[ Math.floor( Math.random() * POSITIONS.length) ];

	return {
		name,
		family,
		power,
		age,
		position
	}
};

module.exports = {
	NAMES,
	FAMILIES,
	POSITIONS,
	Generator
};

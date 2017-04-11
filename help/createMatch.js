const fs = require("fs");
const path = require("path");
const teamGenerator = require("./teamGenerator");

const setPlayerCurrentState = team => {

	team.players.forEach( player => {
		player.current_position = player.position;
		player.current_power = player.power;
	});

}

const Create = () => {
	let Match = {};

	Match.current_time 		= 1;
	Match.current_minute 	= 0;
	Match.is_begin 			= true;
	Match.is_end			= false;
	Match.home_score		= 0;
	Match.guest_score		= 0;

	Match.home 				= teamGenerator();
	Match.guest 			= teamGenerator();

	setPlayerCurrentState( Match.home );
	setPlayerCurrentState( Match.guest );

	fs.writeFileSync( path.join(__dirname, "../match.json"), JSON.stringify(Match, null, "\t"), "utf-8");
}

module.exports = Create;

Create();
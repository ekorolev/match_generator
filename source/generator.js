
/*	===================================

		Класс игроков

	=================================== */
class Players {

	constructor ( json ) {
		this.name 				= json.name;
		this.family 			= json.family;
		this.power 				= json.power;
		this.age 				= json.age;
		this.position 			= json.position;

		this.current_position 	= json.current_position;
		this.current_power 		= json.current_power;
	}

	toJSON () {
		return {
			name: 				this.name,
			family: 			this.family,
			power: 				this.power,
			age: 				this.age,
			position: 			this.position,
			current_position: 	this.current_position,
			current_power: 		this.current_power
		}
	}
}

/* ===================================
		
		Класс команд

	=================================== */

class Teams {

	constructor ( json ) {
		this.name 				= json.name;
		this.current_stage		= json.current_stage || null;
		this.players 			= json.players.map( player_json => new Players(player_json) );
	}

	toJSON () {
		return {
			name: 			this.name,
			players: 		this.players.map(player => player.toJSON()),
			current_stage: 	this.current_stage
		}
	}

}

/*	===================================
		
		Класс игры

	=================================== */

class Games {

	constructor ( json, parameters ) {
		this.current_time 		= json.current_time;
		this.current_minute 	= json.current_minute;
		this.home_score 		= json.home_score;
		this.guest_score		= json.guest_score;
		this.is_begin			= json.is_begin;
		this.is_end				= json.is_end;

		this.home 				= new Teams( json.home );
		this.guest 				= new Teams( json.guest );

		this.ball_owner 		= this[json.ball_owner] || null;
		this.ball_owner_text	= json.ball_owner || null;

		this.system_log			= parameters.log;
	}

	// Меняем команду, которая владеет мячом
	setBallOwner (owner) {
		this.ball_owner = this[ball_owner];
		this.ball_owner_text = ball_owner;
	}

	// Печатаем основную информацию об игре
	//		эта функция нужна только для разработки
	showInfo () {
		this.system_log(`\n\n===================================\n`);
		this.system_log(`${this.home.name} (${this.home_score}:${this.guest_score}) ${this.guest.name}`);
		this.system_log(`Current part of game: ${this.current_time}`);
		this.system_log(`Current minute of game: ${this.current_minute}`);
		this.system_log(`\n===================================\n\n`);
	}

	// Игра только началась?
	isBegin() { return this.is_begin; };

	// Отчёт об игре выводится через эту функцию
	log ( parameters ) {
		this.system_log( parameters );
	}

	// Преобразуем объект в json
	toJSON () {
		return {
			current_minute: 	this.current_minute,
			current_time: 		this.current_time,
			home_score: 		this.home_score,
			guest_score: 		this.guest_score,
			is_begin: 			this.is_begin,
			is_end: 			this.is_end,
			home: 				this.home.toJSON(),
			guest: 				this.guest.toJSON(),
			ball_owner: 		this.ball_owner_text
		}
	}
}

/*	===================================

		Функция - генератор

	=================================== */

const Generator = Game => {

	if ( Game.isBegin() ) {
		
	}

}

const Start = MatchJSON => {

	let Game = new Games( MatchJSON, { log: console.log } );
	
	Game.showInfo();	
	Generator( Game );
	Game.showInfo();

	return Game.toJSON();
}

module.exports = Start;
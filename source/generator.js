
/* таблица активности игроков для зоны */
const ActivityTable = {

	"passTo": {
		"def": {
			"1": ["LD", "CD", "RD", "SW"],
			"2": ["DM"],
			"3": ["LM", "CM", "RM"],
			"4": ["AM", "CF", "LF", "RF"],
			"5": []
		},

		"mdef": {
			"1": ["LM", "CM", "RM"],
			"2": ["AM", "DM"],
			"3": ["LD", "CD", "RD", "LF", "RF", "CF"],
			"4": [],
			"5": []
		},

		"att": {
			"1": ["LF", "CF", "RF"],
			"2": ["AM"],
			"3": ["LM", "CM", "RM"],
			"4": ["DM"],
			"5": ["LD", "CD", "RD"]
		}		
	},

	"begin": {
		"1": ["LF", "CF", "RF", "AM"],
		"2": ["CM"],
		"3": ["LM", "RM"],
		"4": ["DM"],
		"5": ["LD", "CD", "RD"]
	}

}


/*	===================================

		Класс игроков

	=================================== */
class Players {

	constructor ( json, parameters ) {
		this.name 				= json.name;
		this.family 			= json.family;
		this.power 				= json.power;
		this.age 				= json.age;
		this.position 			= json.position;

		this.current_position 	= json.current_position;
		this.current_power 		= json.current_power;

		this.team 				= parameters.team;
	}

	// Печатаем текстовое описание игрока
	text() {
		return `${this.name} ${this.family} (${this.getTeam().name}, ${this.pos()}, ${this.getPower()}, ${this.activeValue})`;
	}

	// Возвращаем команду, в которой находится игрок.
	getTeam() {
		return this.team;
	}

	// возвращаем текущую позицию игрока на поле
	pos() {
		return this.current_position;
	}

	// возвращает текущую силу игрока
	getPower() {
		return this.current_power;
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
		this.players 			= json.players.map( player_json => new Players(player_json, { team: this }) );
	}

	// Устанавливаем положение команды на поле
	setCurrentStage (stage) {

		switch (stage) {
			case "def":

				this.current_stage = stage;
			break;

			case "mdef": 

				this.current_stage = stage;
			break;

			case "att":

				this.current_stage = stage;
			break;

			default:
				throw new Error("Unknow type of team stage");
		}
	}

	// Высчитываем среднюю силу команды 
	getAverage() {
		let summ = 0;
		let amount = 0;
		this.players.forEach( player => {
			summ += player.getPower();
			++amount;
		});		
		return summ / amount;
	}

	// Определяем игрока, который будет исполнителем ситуации
	getActive ( type, opt1, opt2 ) {
		let Result;

		switch (type) {

			// Определяем игрока, который даст пас из центра поля
			case "begin":
				this.players.forEach( player => {
					player.activeValue = 0;
					for (let i = 0; i < 5; ++i) {
						if (ActivityTable["begin"][i+1].indexOf(player.pos())+1) {
							player.activeValue += 100 - i*10;
						}
					}

					player.activeValue += ( player.getPower() / player.getTeam().getAverage() -1) * 10;

					player.activeValue += Math.floor( Math.random() * 30 );
				});

				Result = {activeValue: 0};
				this.players.forEach( player => {
					if ( player.activeValue > Result.activeValue ) {
						Result = player;
					}
				});

			break;

			// Определяем игрока, которому придёт пас в назначенную зону поля
			case "passTo":
				let zone = opt1; // Зона куда идет пас
				let passFrom = opt2; // От кого пас

				// Пробегаемся по игрокам и назначаем базовую активность
				this.players.forEach( player => {

					player.activeValue = 0;

					for (let i = 0; i < 5; ++i ) {
						if (ActivityTable["passTo"][zone][i+1].indexOf(player.pos())+1) {
							player.activeValue += 100 - i*10;
						}

						// Если это игрок, который пасует, то он ублюдок.
						if ( Object.is( player, passFrom ) ) {
							player.activeValue = -1000;
						}
					}

					// Узнаем про силу.
					player.activeValue += ( player.getPower() / player.getTeam().getAverage() -1 ) * 10;

					// Добавляем рандомчика
					player.activeValue += Math.floor( Math.random() * 30 );
				});

				// Выбираем максимального по активности игрока
				Result = { activeValue: 0 };
				this.players.forEach( ( player, index ) => {
					if ( player.activeValue > Result.activeValue ) {
						Result = player;
					}
				});

			break;
		}

		return Result;
	}

	// Преборазование к JSON-формату.
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
		// Отсчёт времени
		this.current_time 		= json.current_time;
		this.current_minute 	= json.current_minute;
		
		// Определенное на предыдущей минуте действие
		this.next_event 		= json.next_event;
		this.next_event_options = json.next_event_options;

		// Счёт игры
		this.home_score 		= json.home_score;
		this.guest_score		= json.guest_score;

		// Начало \ Конец
		this.is_begin			= json.is_begin;
		this.is_end				= json.is_end;

		// Создание и назначение команд
		this.home 				= new Teams( json.home );
		this.guest 				= new Teams( json.guest );

		// Определение команд, владеющих мячом
		this.ball_owner 		= this[json.ball_owner] || null;
		this.ball_owner_text	= json.ball_owner || null;

		// Назначаем функцию-ведение лога
		this.system_log			= parameters.log;
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

	// Операции с командой, владеющей мячом
	ballOwner ( owner ) {
		// Назначаем команду
		if (owner) {
			this.ball_owner = this[owner];
			return this.ball_owner;
		}
		// Возвращаем команду
		if ( !owner ) {
			return this.ball_owner;
		}
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
			ball_owner: 		this.ball_owner_text,
			next_event: 		this.next_event,
			next_event_options: this.next_event_options
		}
	}
}

/*	===================================

		Функция - генератор

	=================================== */

const Generator = Game => {
	let event 			= Game.next_event 			|| null	; // Действие
	let eventOptions	= Game.next_event_options 	|| {}	; // Параметры действия

	if ( Game.isBegin() ) {
		Game.ballOwner("home");
		Game.home.setCurrentStage("def");
		Game.guest.setCurrentStage("def");

		// Определяем активность игроков для исполнителя паса
		let playerFrom = Game.ballOwner().getActive("begin");

		// Определяем активность игроков для получателя паса
		let playerTo = Game.ballOwner().getActive("passTo", "def", playerFrom);

		event = "pass";
		eventOptions = { from: playerFrom, to: playerTo };

		Game.system_log(`${playerFrom.text()} будет давать пас ${playerTo.text()}`);
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
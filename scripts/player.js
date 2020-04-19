var initialPlant = clone(_plants[0]);
initialPlant.id = ID();

var _player = {
	name: 'Default',
	// cookies: 500,
	cookies: 999999999,
	watering_can: 'standard',
	auto_watering: false,
	collector: null,
	sprinkler: null,
	auto_collecting: false,
	plants: [
		initialPlant
	],
	no_plants: false,
	
	shop_visited: 0,
	manual_collect: 0,
	manual_watering: 0,
	dead_plants: [],
	got_all_achievement: false,

	day: 1,
	period: 'day'
};

game.player = _player;
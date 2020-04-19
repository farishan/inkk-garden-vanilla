// Game Global Variables
var game = {
    title: 'Game Title',
    currentScene: 0,
    player: {},
    collectingList: [],
    is_watering: false,
    need_render: true,
    scenes: [
        {
            id: 0,
            name: 'Main Menu',
            navs: [1]
        },
        {
            id: 0.1,
            name: 'Settings',
            scripts: ['scripts/settings'],
            navs: [1]
        },
        {
            id: 1,
            name: 'Main',
            scripts: ['scripts/garden'],
            navs: [2, 0, 0.1]
        },
        {
            id: 2,
            name: 'Shop',
            scripts: ['scripts/shop'],
            navs: [1]
        }
    ],
    checkPlants(){
        var self = this;

        if(self.player.auto_watering){
            self.autoWatering();
        }

        if(self.player.collector && !self.player.auto_collecting){
            self.player.cookies--;
        }

        var noPlants = true;

        for (var i = 0; i < this.player.plants.length; i++) {
            var plant = this.player.plants[i];
            if(plant){

                noPlants = false;
                if(plant.water>0){
                    if(plant.dry){
                        plant.dry = false;
                        plant.health = plant.default_health;
                    }
                    if(!plant.ready){
                        self.photosynthesis(plant);
                    }else{
                        plant.cookie_health--;
                        if(plant.cookie_health==0){
                            removeCookies(plant);
                        }
                    }
                }else{
                    if(!plant.dry){
                        plant.dry = true;
                    }
                    plant.water = 0;
                    plant.health--;
                    if(plant.health==0){
                        removePlant(plant);
                    }
                }

                if(plant.progress === 0){
                    plant.ready = false;
                }else if(plant.progress === 100){
                    plant.ready = true;
                }
            }
        }

        this.player.no_plants = noPlants;
        if(noPlants){
            this.isWatering = false;
            this.selectingAction = false;
        }
    },
    photosynthesis: function(plant){
        let plants = this.player.plants;
        for (let index = 0; index < plants.length; index++) {
            const plant = plants[index];
            progress(plant);
        }
    }
}

function progress(plant){
    if(plant.progress<100 && !plant.ready){
        if(!game.player.auto_watering){
            plant.water--;
        }
        plant.progress+= randomGrowth(true, plant.daily_growth-5, plant.daily_growth);

        checkProgress(plant);
        // console.log(plant.name + ' progress: ' + plant.progress)
    }else{
        checkProgress(plant);
    }

    function checkProgress(plant){
        if(plant.stage === 2 && plant.progress >= 100){
            plant.progress = 100;
            setToReady(plant);
        }else if(plant.stage < 2 && plant.progress >= 100){
            plant.stage++;
            plant.progress = 0;
        }else{

        }
    }

    function setToReady(plant){
        var ada = false;
        for (var i = 0; i < game.collectingList.length; i++) {
            var p = game.collectingList[i];
            if(p.id == plant.id){
                ada = true;
            }
        }
        if(!ada){
            game.collectingList.push(plant);
        }

        if(!plant.ready){
            plant.ready = true;
            console.log(plant.id + ' ready to collect.')
        }

        game.need_render = true;
    }
}

function removePlant(plant){
    for (var i = 0; i < game.player.plants.length; i++) {
        var data = game.player.plants[i];
        if(plant.id == data.id){
            game.player.plants.splice(i, 1);
            game.player.dead_plants.push(plant);
        }
    }
    game.need_render = true;
}

function removeCookies(plant){
    for (var i = 0; i < game.player.plants.length; i++) {
        var data = game.player.plants[i];
        if(plant.id == data.id){
            plant.progress = 0;
            plant.ready = false;
            plant.cookie_health = plant.default_cookie_health;
        }
    }
    game.need_render = true;
}

function randomGrowth(floor, x, y){
	var result;
	if(floor){
		result = Math.floor(Math.random() * (y - x + 1)) + x;
	}else{
		result = Math.random() * (y - x + 1) + x;
	}
	return result;
}

function save(){
	localStorage.setItem(game.title.split(' ').join('_') + '_data', JSON.stringify(game));
};

function load(){
	let data = JSON.parse(localStorage.getItem(game.title.split(' ').join('_') + '_data'));
    game = data;
    player = game.player;
    console.log(game);
};

var plants = game.player.plants;

var garden = {
    UI: document.createElement('div'),
    UI__slots: document.createElement('div'),
    UI__controllers: document.createElement('div'),
    UI__cookies: document.createElement('div'),
    interval: null,
    init: function(){
        var self = this;
        game.need_render = true;
        this.UI.innerHTML = "GARDEN";

        this.UI.appendChild(this.UI__cookies);

        this.renderPlants();
        this.interval = setInterval(function(){
            self.renderPlants();
            self.renderCookies();
        }, _config.renderSpeed);

        // Garden controller UI
        var watering_button = document.createElement('button');
        watering_button.innerHTML = 'water';
        watering_button.onclick = function(){
            console.log('watering...')
            if(game.is_watering === false){
                game.is_watering = true;
                watering_button.innerHTML = 'cancel';
            }else{
                game.is_watering = false;
                watering_button.innerHTML = 'water';
            }
            console.log(game.is_watering)
        }
        this.UI__controllers.appendChild(watering_button);

        this.UI__slots.classList.add('slots');
        this.UI.appendChild(this.UI__slots);
        this.UI.appendChild(this.UI__controllers);
    },
    collectCookies: function(plant){
        var cookies = Math.floor(convertPrice(random(true, 15, 20), plant.price));
        game.player.cookies += cookies;
        game.need_render = true;

        console.log('get '+cookies+' cookies from '+plant.id);
        console.log(game.player.cookies);

        // PLANT PROCESSING
        plant.ready = false;
        plant.progress = 0;
        plant.cookie_health = plant.default_cookie_health;
        for (var j = 0; j < game.collectingList.length; j++) {
            var data = game.collectingList[j];
            if(data.id == plant.id){
                console.log(j, 'remove '+plant.id+'/'+data.id+' from collecting list')
                game.collectingList.splice(j, 1);
            }
        }

        game.need_render = true;
    },
    renderPlants: function(){
        var self = this;
        if(game.need_render === false){
            for (let index = 0; index < this.UI__slots.children.length; index++) {
                let slot = this.UI__slots.children[index];
                for (let index1 = 0; index1 < plants.length; index1++) {
                    const plant = plants[index1];
                    if(slot.dataset.id == plant.id){
                        slot.children[0].innerHTML =
                            plant.name
                            + '|' + plant.progress
                            + '|ready:' + plant.ready
                            + '|stage:' + plant.stage
                            + '|water:' + plant.water
                            + '|cookie_health:' + plant.cookie_health
                            + '|health:' + plant.health
                        ;
                    }
                }
            }
        }else{
            this.UI__slots.innerHTML = '';
            for (let index = 0; index < plants.length; index++) {
                const plant = plants[index];

                var UI__plant = document.createElement('div');
                UI__plant.dataset.id = plant.id;
                UI__plant.classList.add('plant');
                var plantInfo = document.createElement('div');
                var plantActions = document.createElement('div');
                plantInfo.innerHTML =
                    plant.name
                    + '|' + plant.progress
                    + '|ready:' + plant.ready
                    + '|stage:' + plant.stage
                    + '|water:' + plant.water
                    + '|cookie_health:' + plant.cookie_health
                    + '|health:' + plant.health
                ;

                UI__plant.appendChild(plantInfo);
                UI__plant.appendChild(plantActions);

                // Render Collect Button
                if(plant.progress == 100 && plant.ready){
                    var collect = document.createElement('button');
                    collect.innerHTML = 'collect';
                    collect.onclick = function(){
                        self.collectCookies(plant);
                    }
                    UI__plant.children[1].appendChild(collect);
                }

                UI__plant.onclick = function(){
                    if(game.is_watering){
                        console.log('WATERING: ', plant.id, plant.water)
                        plant.water = plant.water_capacity;
                    }else{
                        console.log(plant);
                    }
                }
                this.UI__slots.appendChild(UI__plant);
            }
            game.need_render = false;
        }
    },
    renderCookies: function(){
        garden.UI__cookies.innerHTML = 'Cookies: ' + game.player.cookies;
    }
};

garden.init();

UI.inject(garden.UI);
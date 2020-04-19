var div = document.createElement('div');

for (let index = 0; index < _plants.length; index++) {
    const plant = _plants[index];

    var UI__plant = document.createElement('div');
    UI__plant.style.border = '1px solid';
    UI__plant.style.display = 'inline-block';

    // Plant Name
    var UI__plant_name = document.createElement('h3');
    UI__plant_name.innerHTML = plant.name + ' seed | ' + plant.price;
    UI__plant.appendChild(UI__plant_name);

    // Buy Button
    var UI__button = document.createElement('button');
    UI__button.innerHTML = 'BUY';
    UI__button.addEventListener('click', function(e){

        // Player trying to buy item
        if(game.player.cookies < plant.price){
            console.log('not enough cookies')
        }else{
            buy(plant);
        }
    });
    UI__plant.appendChild(UI__button);

    div.appendChild(UI__plant);
}

UI.inject(div);

function buy(plant){
    var wrapped = clone(plant);
    wrapped.id = ID();
    game.player.plants.push(wrapped);
    game.player.cookies -= plant.price;
}
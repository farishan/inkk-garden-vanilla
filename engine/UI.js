/*
    --- User Interface Hierarchy ---

    - game
        - scenes
            - scene
            - scene
            - scene
                - other UI
*/

// UI Local Config
const scenePrefix = 'scene_';

// 1. Create UI elements
var UI__game = document.createElement('main');
var UI__scenes = document.createElement('div');

// Combine UIs
UI__game.appendChild(UI__scenes);

const UI = {
    init: function(game){
        document.title = game.title;

        // Show the elements
        // *without this line, nothing will show.
        document.body.appendChild(UI__game);
    },
    createScene: function(scene){
        // Reset scene scripts
        _scriptsContainer.innerHTML = '';

        // Start creating scene
        const div = document.createElement('div');
        div.classList.add('scene');

        if(scene.id) div.id = scenePrefix + scene.id;
        if(scene.name) div.dataset.name = scene.name;
        if(isDev()){
            div.innerHTML += '[current scene:]' + scene.name + '<br/>';
        }

        if(scene.scripts && scene.scripts.length > 0){
            injectScripts(scene.scripts, function(){});
        }

        if(scene.navs){
            for (let index = 0; index < scene.navs.length; index++) {
                const nav = scene.navs[index];
                var button = document.createElement('button');
                button.innerHTML = game.scenes.find(x => x.id == nav).name;
                if(isDev()){
                    button.innerHTML = 'goto: [' + nav + ']' + game.scenes.find(x => x.id == nav).name;
                }
                button.dataset.href = nav;
                div.appendChild(button);
            }
        }else{
            if(isDev()){
                console.error('Something wrong with the element navs.');
            }
        }

        return div;
    },
    inject(div){
        UI__scenes.appendChild(div);
    }
}

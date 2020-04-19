/*
    Engine - Scene Manager
    Dependencies:
    game, timeManager, UI
*/

const sceneManager = {
    game: {},
    init: function(game, callback){
        var self = this;
        this.game = game;
        this.setScene(this.game.currentScene);

        /* Inject all scenes */
        // this.injectScenes(scenes);

        // Inject current scene
        // convert currentScene from id to object
        var currentScene = this.game.scenes.find(x => x.id ==this.game.currentScene);
        this.injectScene(currentScene, function(){
            callback(self.game);
        });
    },
    addNavListener(scene, callback){
        var self = this;
        var buttons = document.querySelectorAll('button');
        for (let index = 0; index < buttons.length; index++) {
            const button = buttons[index];

            // Add click listener to nav
            button.addEventListener('click', function(e){

                // get the target scene id
                let target = e.target.dataset.href;

                // get currentScene id
                let current = scene.id;

                console.log('target:', target)

                if(target != current){
                    game.currentScene = target;

                    // Append a scene
                    // self.injectScene(game.currentScene);

                    // Change the scene
                    self.changeScene(game.currentScene);
                }
            })
        }
        callback();
    },
    setScene: function(sceneId){
        for (let index = 0; index < this.game.scenes.length; index++) {
            const scene = this.game.scenes[index];
            if(scene.id === sceneId){
                this.game.currentScene = sceneId;
            }
        }
    },
    changeScene(sceneId){
        if(sceneId === 0){
            timeManager.pause();
        }else{
            timeManager.resume();
        }
        UI__scenes.innerHTML = '';
        this.injectScene(this.game.scenes.find(x => x.id == sceneId), function(){});
    },
    injectScene(scene, callback){
        UI__scenes.appendChild(UI.createScene(scene));
        this.addNavListener(scene, function(){
            callback();
        });
    },
    injectScenes: function(scenes){
        UI__scenes.innerHTML = '';
        for (let index = 0; index < scenes.length; index++) {
            const scene = scenes[index];
            this.injectScene(scene, function(){});
        }
    }
}

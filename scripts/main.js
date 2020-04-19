/*
    This file is for controlling all scripts together.
*/

UI.init(game);
sceneManager.init(game, function(newGame){
    game = newGame;
});
timeManager.start(game);

if(isDev()){
    injectScript('todo');
}
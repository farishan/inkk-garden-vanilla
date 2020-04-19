/*
    This script is for injecting scripts only.
    Combining engine scripts with game scripts.
    How to inject scripts:

    - Pure and static scripts first. script with no dependencies. (ex: config)
    - Explain dependencies on the first line of not-pure scripts.
*/

const scriptContainer = {
    main: 'scripts/main',
    statics: [
        'engine/_config',
        'engine/_functions',
        'scripts/plants',
        'scripts/game'
    ],
    others: [
        'engine/UI',
        'engine/time_manager',
        'engine/scene_manager',
        'scripts/player'
    ]
}

var _scriptsContainer = document.createElement('div');
_scriptsContainer.style.position = 'absolute';

window.onload = function(){
    document.body.appendChild(_scriptsContainer);
    injectScripts(scriptContainer.statics, function(){
        console.log('static scripts injected.')
        injectScripts(scriptContainer.others, function(){
            console.log('other scripts injected.')
            injectScript(scriptContainer.main);
        });
    });
}

function injectScript(name) {
    return new Promise(function(resolve, reject){
        var script = document.createElement('script');
        script.src = './'+name+'.js';
        script.onload = function(){
            console.log('* ' + name + ' script injected.')
            resolve();
        }
        _scriptsContainer.appendChild(script);
    });
}

function injectScripts(scripts, callback) {
    var counter = 0;
    for (let index = 0; index < scripts.length; index++) {
        const script = scripts[index];
        injectScript(script).then(function(){
            counter++;
            if(counter >= scripts.length){
                callback();
            }
        });
    }
}

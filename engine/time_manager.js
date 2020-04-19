const timeManager = {
    timeInterval: null,
    time: 0,
    isPaused: false,
    start: function(game){
        if(game.currentScene === 0){
            this.isPaused = true;
        }
        let self = this;
        this.timeInterval = setInterval(function(){
            if(!self.isPaused){
                // console.log('time is ticking')
                self.time++;
                game.checkPlants();
            }else{
                console.log('time is paused')
            }
        }, _config.interval);
    },
    pause: function(){
        this.isPaused = true;
    },
    resume: function(){
        this.isPaused = false;
    }
}
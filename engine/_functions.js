function ID() {
    return '_' + Math.random().toString(36).substr(2, 9);
};

function isDev(){
    return _config.mode === 'development';
}

function clone(obj){
    return JSON.parse(JSON.stringify(obj));
}

function convertPrice(percent, p){
	return p - (p * (100-percent) / 100);
}

function random(floor, x, y){
	var result;
	if(floor){
		result = Math.floor(Math.random() * (y - x + 1)) + x;
	}else{
		result = Math.random() * (y - x + 1) + x;
	}
	return result;
}

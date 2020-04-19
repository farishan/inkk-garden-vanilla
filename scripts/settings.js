var div = document.createElement('div');

// SAVE
var button_save = document.createElement('button');
button_save.innerHTML = 'save';
button_save.onclick = function () {
    save();
    button_save.disabled = true;
    button_save.innerHTML = 'saved';

    setTimeout(function(){
        button_save.disabled = false;
        button_save.innerHTML = 'save';
    }, 1000);
}

// LOAD
var button_load = document.createElement('button');
button_load.innerHTML = 'load';
button_load.onclick = function () {
    load();
    button_load.disabled = true;
    button_load.innerHTML = 'loaded';

    setTimeout(function(){
        button_load.disabled = false;
        button_load.innerHTML = 'load';
    }, 1000);
}

var textarea = document.createElement('textarea');

// EXPORT
var button_export = document.createElement('button');
button_export.innerHTML = 'export';
button_export.onclick = function () {
    exportData(game);
    button_export.disabled = true;
    button_export.innerHTML = 'exported';

    setTimeout(function(){
        button_export.disabled = false;
        button_export.innerHTML = 'export';
    }, 1000);
}

// IMPORT
var button_import = document.createElement('button');
button_import.innerHTML = 'import';
button_import.onclick = function () {
    importData(textarea.value);
    button_import.disabled = true;
    button_import.innerHTML = 'imported';

    setTimeout(function(){
        button_import.disabled = false;
        button_import.innerHTML = 'import';
    }, 1000);
}


div.innerHTML = '<h3>Settings</h3>';
div.appendChild(button_save);
div.appendChild(button_load);
div.appendChild(textarea);
div.appendChild(button_export);
div.appendChild(button_import);
UI__scenes.appendChild(div);

function exportData(obj){
	textarea.value = btoa(JSON.stringify(obj));

	// return btoa(JSON.stringify(obj));
};

function importData(b64){
	var result = JSON.parse(atob(b64));
    console.log(result);

	// return JSON.parse(atob(b64));
};
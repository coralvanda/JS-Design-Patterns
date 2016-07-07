var model = {
	init: function(){
		var names = ["Socks", "Bashful", "Cuddles", 
			"Lemon", "Lieutenant Jeff"];
		var kitties = {
			"Socks": 0, 
			"Bashful": 0, 
			"Cuddles": 0, 
			"Lemon": 0, 
			"Lieutenant Jeff": 0
		};
		localStorage.setItem('names', JSON.stringify(names));
		localStorage.setItem('kitties', JSON.stringify(kitties));
	},
	getParsedKitties: function() {
		var kitties = localStorage.getItem('kitties');
		kitties = JSON.parse(kitties);
		return kitties;
	},
	countClick: function(name) {
		var kitties = model.getParsedKitties();
		kitties[name] += 1;
		localStorage.setItem('kitties', JSON.stringify(kitties));
	},
	getCount: function(name) {
		var kitties = model.getParsedKitties();
		return kitties[name];
	},
	getNames: function() {
		var names = localStorage.getItem('names');
		names = JSON.parse(names);
		return names;
	}
};


var octopus = {
	init: function(){
		model.init();
		view.init();
	},
	getNames: function(){
		return model.getNames();
	},
	countClick: function(name){
		model.countClick(name);
	},
	getCount: function(name) {
		return model.getCount(name);
	}
};


var view = {
	init: function(){
		this.catnav = document.getElementById('catnav');
		// stuff
		view.render();
	},
	render: function(){
		var names = octopus.getNames();
		for (i = 0; i < names.length; i++){
			var kitty = names[i];
			var list_item = document.createElement("LI");
			list_item.id = 'nav' + kitty;
			list_item.addEventListener('click', (function(kittyCopy) {
				return function() {
					var name = document.getElementById("kittyName");
					name.innerHTML = kittyCopy;
					var pic = document.getElementById("kittyPic");
					pic.src = "images/" + kittyCopy + ".jpg";
					pic.addEventListener('click', function() {
						octopus.countClick(kittyCopy);
						document.getElementById("kittyClicks").innerHTML = octopus.getCount(kittyCopy);
					});
				}
			})(kitty));
			var textnode = document.createTextNode(kitty);
			list_item.appendChild(textnode);
			this.catnav.appendChild(list_item);
		}
	}
};


octopus.init();
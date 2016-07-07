var model = {
	active_kitty: null,
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
		var names = this.getNames();
		this.setActiveKitty(names[0]);
		view_main.init();
		view_nav.init();
	},
	getActiveKitty: function() {
		return model.active_kitty;
	},
	setActiveKitty: function(name) {
		model.active_kitty = name;
	},
	getNames: function(){
		return model.getNames();
	},
	countClick: function(){
		var active_kitty = this.getActiveKitty();
		model.countClick(active_kitty);
	},
	getCount: function(name) {
		return model.getCount(name);
	}
};


var view_main = {
	init: function(){
		this.name 	= document.getElementById('kittyName');
		this.pic 	= document.getElementById('kittyPic');
		this.clicks = document.getElementById('kittyClicks');

		this.pic.addEventListener('click', function() {
			octopus.countClick();
			view_main.render();
		});

		this.render();
	},
	render: function(){
		var active_kitty = octopus.getActiveKitty();
		this.name.textContent = active_kitty;
		this.pic.src = "images/" + active_kitty + ".jpg";
		this.clicks.textContent = octopus.getCount(active_kitty);
	}
};


var view_nav = {
	init: function() {
		this.catnav = document.getElementById('catnav');
		this.render();
	},
	render: function() {
		var names, kitty, list_item;
		this.catnav.innerHTML = '';
		names = octopus.getNames();
		for (i = 0; i < names.length; i++){
			kitty = names[i];
			list_item = document.createElement("LI");
			list_item.id = 'nav' + kitty;
			list_item.textContent = kitty;
			list_item.addEventListener('click', (function(kittyCopy) {
				return function() {
					octopus.setActiveKitty(kittyCopy);
					view_main.render();
				};
			})(kitty));
			this.catnav.appendChild(list_item);
		}
	}
};


octopus.init();
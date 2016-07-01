var kitties = ["Socks", "Bashful", "Cuddles", "Lemon", "Lieutenant Jeff"]

for(var i = 0; i < kitties.length; i++){
	var kitty = kitties[i];
	var catnav = document.getElementById('catnav');
	var item = document.createElement("LI");
	item.id = "nav" + kitty;
	item.addEventListener('click', (function(kittyCopy) {
		return function() {
			var counter = 0;
			var name = document.getElementById("kittyName");
			name.innerHTML = kittyCopy;
			var pic = document.getElementById("kittyPic");
			pic.src = "images/" + kittyCopy + ".jpg";
			pic.addEventListener('click', (function(counterCopy) {
				return function(){
					counterCopy += 1;
					document.getElementById("kittyClicks").innerHTML = counterCopy;
				};	
			})(counter));	
		};
	})(kitty));
	var textnode = document.createTextNode(kitty);
	item.appendChild(textnode);
	catnav.appendChild(item);
}

// Currently not keeping track of the various kitties correctly, and 
// only working with the last one
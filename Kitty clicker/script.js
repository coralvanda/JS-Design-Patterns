// Kitties are easily added by adding the name to this list, provided
// that the name is also the name of the JPG file (ex. Socks.jpg)
var kitties = ["Socks", "Bashful", "Cuddles", "Lemon", "Lieutenant Jeff"];

// For each kitty in the list, a button in the navbar on the left will
// be added and, when clicked on, it will display that cat with its info
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

// Still resetting count for each cat when changed between using the navbar
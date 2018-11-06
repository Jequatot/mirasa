//containers
//room object arrays

var h;

function diemenutoggle() {
	var x = document.getElementById("diedropdown");
	if (x.style.display === "block") {
		x.style.display = "none";
	} else {
		x.style.display = "block";
	}
}

function changemenu(kind) {
	var bar = document.getElementById("leftbar");
	var names;
	while(bar.hasChildNodes()) {
		bar.removeChild(bar.lastChild);
	}
	
	if(kind == "home") {
		var np = document.createElement("p");
		var node = document.createTextNode("Home");
		np.appendChild(node);
		bar.appendChild(np);
			
		makebutton("Player Characters", "gothere('pcs.html')");
		makebutton("Skills", "gothere('skills.html')");
		makebutton("Subsector D: Aramis", "changemenu('planet')");
		makebutton("Races", "changemenu('race');");
		
		var np = document.createElement("p");
		var node = document.createTextNode("Maps");
		np.appendChild(node);
		bar.appendChild(np);
		
		makebutton("Harrier Class Cargo Vessel", "gothere('ship_map.html')");
	} else {
		makebutton("Back", "changemenu('home')");
		
		if(kind == "planet") {
			var np = document.createElement("p");
			var node = document.createTextNode("Subsector D: Aramis");
			np.appendChild(node);
			bar.appendChild(np);
			
			names = ["aram", "subsector_map", "aramanx", "aramis", "jesedipere", "lewis", "natoko", "the_patinir_belt", "pysadi", "zila", "other_planets"];
		}
		
		if(kind == "race") {
			var np = document.createElement("p");
			var node = document.createTextNode("Races");
			np.appendChild(node);
			bar.appendChild(np);
			
			names = ["races", "diruk", "golgothan", "human", "orsian", "shirren", "velani", "vesk", "zhodani", "wildlife"];
		}
	}
	
	for(var i = 1; i < names.length; i++) {
		makebutton(names[i].replace(/_/g, " "), "gothere('" + names[0] + "/" + names[i] + ".html')");
	}
}

function makebutton(name, action) {
	var bar = document.getElementById("leftbar");
	var nb = document.createElement("button");
	var node = document.createTextNode(name);
	nb.appendChild(node);
	nb.setAttribute( "onClick", "javascript: " + action + ";");
	bar.appendChild(nb);
}

function gothere(srce) {
	document.getElementById("frame").src = srce;
}

function roll() {
	h = setInterval(rollsub,40);
	setTimeout(endroll, 1000);
}

function rollsub() {
	document.getElementById("dieout1").value
		= Math.floor(Math.random() * 3)-1;
	document.getElementById("dieout2").value
		= Math.floor(Math.random() * 3)-1;
	document.getElementById("dieout3").value
		= Math.floor(Math.random() * 3)-1;
	document.getElementById("dieout4").value
		= Math.floor(Math.random() * 3)-1;
	document.getElementById("dieoutf").value =
		Number(document.getElementById("dieout1").value) +
		Number(document.getElementById("dieout2").value) +
		Number(document.getElementById("dieout3").value) +
		Number(document.getElementById("dieout4").value) +
		Number(document.getElementById("diemod").value);
}

function endroll() {
	window.clearInterval(h);
}
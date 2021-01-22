//containers
//room object arrays

var h;
var music_loaded = false;
var die_loaded = false;

function menutoggle(menu) {
	var x = document.getElementById(menu);
	if(menu == "music_dropdown") {
		if(!music_loaded) {
			mc = "";
			for(i = 0; i < music_content.length; i++)
				mc += music_content[i] + "<br/>";
			x.innerHTML = mc;
			music_loaded = true;
		}
		document.getElementById("die_dropdown").style.display = "none";
	} else {
		if(!die_loaded) {
			x.innerHTML = 
			'<button id="roller" class="button_roller" onclick="roll();">roll!</button>\
			<input type="text" id="dieout1" class="input_roller"> +\
			Modifier:\
			<input type="text" id="diemod" class="input_roller"> =\
			<input type="text" id="dieoutf" class="input_roller">&nbsp;';
			die_loaded = true;
		}
		document.getElementById("music_dropdown").style.display = "none";
	}
	if (x.style.display === "block") {
		x.style.display = "none";
	} else {
		x.style.display = "block";
	}
}

function changemenu(new_menu) {
	var bar = document.getElementById("leftbar");
	var i = -1;
	var m;
	
	gothere('views/' + new_menu + '/overview.html');
	
	while(bar.hasChildNodes()) {
		bar.removeChild(bar.lastChild);
	}
	
	do {
		i++
		m = menu_content[i];
	} while(new_menu != m.name);
	
	for(i = 0; i < m.content.length; i++) {
		if(m.content[i].action == "NODE") {
			var np = document.createElement("p");
			if(m.content[i].title == "DATE") {
				var d = new Date(document.lastModified);
				np.innerHTML = d.getMonth()+1 + "." + d.getDate() + "." + (parseInt(d.getYear()) - 100);
				//np.innerHTML = d.toDateString();
			} else
				np.innerHTML = m.content[i].title;
			np.className = "p_menunode"
			bar.appendChild(np);
		} else {
			makebutton(m.content[i].title, m.content[i].action);
		}
	}
}

function makebutton(name, action) {
	var bar = document.getElementById("leftbar");
	var nb = document.createElement("button");
	nb.innerHTML = name;
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
		= Math.floor(Math.random() * 20)+1;
	document.getElementById("dieoutf").value =
		Number(document.getElementById("dieout1").value) +
		Number(document.getElementById("diemod").value);
}

function endroll() {
	window.clearInterval(h);
}

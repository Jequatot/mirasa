//containers
//room object arrays

var h;

function loadmenu(menu, page) {
	var bar = document.getElementById("sidebar");
	var i = -1;
	var m;
	
	while(bar.hasChildNodes()) {
		bar.removeChild(bar.lastChild);
	}
	
	bar.innerHTML = '<div class="sidebar-header"><a class="pagetitle" href="#">THE DOORS OF ILLUNE</a><div class="pagesubtitle">A SHADOW OF THE DEMON LORD Game</div></div>'
	
	var ul = document.createElement("ul");
	ul.classList.add("list-unstyled")
	ul.classList.add("components")
	
	do {
		i++
		m = menu_content[i];
	} while(menu != m.name);
	
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
			ul.appendChild(np);
		} else {
			var np = document.createElement("li");
			np.innerHTML = m.content[i].title;
			if(m.content[i].action == page) {
				np.childNodes[0].classList.add("active");
				np.childNodes[0].href = "#";
			}
			ul.appendChild(np);
		}
	}
	
	bar.appendChild(ul);
}

function changemenu(new_menu) {
	var bar = document.getElementById("leftbar");
	var i = -1;
	var m;
	
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
	var nb = document.createElement("a");
	nb.innerHTML = name;
	nb.setAttribute( "href", action);
	nb.setAttribute( "class", "btn btn-primary");
	bar.appendChild(nb);
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

function enter() {
	var val = document.getElementById("box").value;
	document.getElementById("box").value = "";
	if(val == "") return;
	if(val == "clear") {
		clear();
		return;
	}
	
	var np = document.createElement("p");
	var node = document.createTextNode(val);
	np.appendChild(node);
	document.getElementById("text").appendChild(np);
	document.getElementById("text").scrollTo(0,document.getElementById("text").scrollHeight);
}

function clear() {
	var bar = document.getElementById("text");
	while(bar.hasChildNodes()) {
		bar.removeChild(bar.lastChild);
	}
}
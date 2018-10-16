var h;

function diemenutoggle() {
	var x = document.getElementById("diedropdown");
	if (x.style.display === "block") {
		x.style.display = "none";
	} else {
		x.style.display = "block";
	}
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
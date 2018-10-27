const DIRID = 8;
const ITEMID = 14;

const SYNONYMS = [
	//commands
	["help", "h"],
	["clear", "c"],
	["look", "l", "examine", "consider"],
	["take", "grab", "get", "acquire", "pick up"],
	["inventory", "i", "items"],
	["drop", "put", "place"],
	["use"],
	["go", "move", "walk"],
	
	//directions
	["north"],
	["south"],
	["east"],
	["west"],
	["up"],
	["down"],
	
	//items
	["lamp", "lantern"],
	["rod", "fishing rod", "frod"]
];

const COMMDEFS = [
	"get a list of commands, or use with a specific command (ie 'help look')",
	"clear previous commands",
	"examine surroundings",
	"add an item to your inventory",
	"look at the items you've obtained", 
	"leave an item behind", 
	"make use of an item. how this is done is based on context"
	];

var ITEMDEFS = [
	"an old, metal lantern",
	"a worn fishing rod"
	];
	
const IGNORABLES = ["the", "a", "to"];
var inventory = [ 0 ];
var parsed = [];

class ROOM {
	constructor(name, desc) {
		this.name = name;
		this.desc = desc;
	}
}

var loc = "intro";
var name;
var state = 0;

var here = new ROOM("YOUR COTTAGE", 1);

function enter() {
	var val = document.getElementById("box").value;
	document.getElementById("box").value = "";
	
	if(val == "") return;
	
	print("> " + val);
	parse(val.split(" "));
	parse2();
}

function parse(inp) {
	var count = 0;
	parsed = [];
	for(var i = 0; i < inp.length; i++) {
		if(inp[i] != "") {
			for(var j = 0; j < SYNONYMS.length; j++) {
				for(k = 0; k < SYNONYMS[j].length; k++){
					if(!SYNONYMS[j][k].includes(" ")) {
						if(inp[i].toLowerCase() == SYNONYMS[j][k]) {
							parsed.push(j);
						}
					} else if(inp.length > i){
						temp = SYNONYMS[j][k].split(" ");
						if(inp[i].toLowerCase() == temp[0] &&
						inp[i + 1].toLowerCase() == temp[1]) {
							parsed.push(j);
							i++;
						}
					}
					if(parsed.length > count) break;
				}
				if(parsed.length > count) break;
			}
			if(parsed.length <= count) {
				for(j = 0; j < IGNORABLES.length; j++) {
					if(inp[i].toLowerCase() == IGNORABLES[j]) {
						j = IGNORABLES.length + 20;
						count--;
					}
				}
				if(j <= IGNORABLES.length) {
					print("I don't know \"" + inp[i] + "\".");
					return;
				}
			}
			count++;
		}
	}
	parsed.push("#");
	//print(inp + "|" + parsed);
}

function parse2() {
	switch(parsed[0]) {
		case 0:
			help(parsed[1]);
			break;
		case 1:
			clear();
			break;
		case 2:
			look(parsed[1]);
			break;
		case 3:
			take(parsed[1]);
			break;
		case 4:
			print("you have:");
			for(var i = 0; i < inventory.length; i++) {
				print(SYNONYMS[ITEMID + inventory[i]][1]);
			}
			break;
		default:
			if(state == 1)
				take(parsed[0]);
			else
				print("something went wrong");
	}
	
	/*else
		if(loc == "intro") {
		loc = "naming";
		print("enter your name")
	} else if(loc == "naming") {
		loc = "start";
		name = inp;
		print("hello " + name);
			
	} else if(parsed[0] == SYNONYMS[4][0]){
	} else {
		print("i don't understand " + inp[0]);
	}*/
}

function print(val) {
	var np = document.createElement("p");
	var scrn = document.getElementById("text");
	var node = document.createTextNode(val);
	np.appendChild(node);
	scrn.appendChild(np);
	scrn.scrollTo(0, scrn.scrollHeight);
}

function help(val) {
	if(val != "#") {
		print(SYNONYMS[val][0].toUpperCase() + ": " + COMMDEFS[val]);
		print("SYNONYMS:")
		for(var j = 1; j < SYNONYMS[val].length; j++) {
			print(SYNONYMS[val][j]);
			return;
		}
	}
	print("COMMANDS:");
	for(var i = 0; i < DIRID; i++) {
		print(SYNONYMS[i][0]);
	}
}

function clear() {
	var bar = document.getElementById("text");
	while(bar.hasChildNodes()) {
		bar.removeChild(bar.lastChild);
	}
}

function look(val) {
	if(val != "#") {
		if(val >= ITEMID) {
			print(ITEMDEFS[val - ITEMID]);
		} else print("you can't look at that");
	} else {
		print("you are in " + here.name);
		if(here.desc != "#")
			print("there is a " + SYNONYMS[ITEMID + here.desc][1]);
	}
}

function take(val) {
	if(val != "#") {
		if(val == ITEMID + here.desc) {
			print("you got " + SYNONYMS[val][1] + "!");
			inventory.push(here.desc);
			here.desc = "#";
		} else print("there is no " + SYNONYMS[val][1] + " here");
		state = 0;
	} else {
		print("what would you like to take?");
		state = 1;
	}
}
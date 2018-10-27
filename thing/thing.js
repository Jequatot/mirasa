const DIRID = 8;
const ROOMID = 16;
const ITEMID = 20;

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
	["north", "n"],
	["south", "s"],
	["east", "e"],
	["west", "w"],
	["up", "u"],
	["down", "d"],
	["out", "outside"],
	["in", "inside"],
	
	//rooms
	["cottage"],
	["garden path"],
	["fishing pond"],
	["winding path"],
	
	//items
	["metal lantern", "lantern", "lamp"],
	["worn fishing rod", "fishing rod", "rod", "frod", "pole", "fishing pole"],
	["rosebush", "red rose", "rose", "flower"],
	["fish", "trout"]
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

//[description, exits. item
var ROOMDEFS = [
	["dusty and dilapidated, but nonetheless you call it home", [6], 1, [1]],
	["a lush garden path outside your cottage", [0, 1, 7], 2, [3, 2, 0]],
	["the edge of a small pond", [0], 3, [1]],
	["a tall tree looms over you", [1, 2, 4], "#", [1, 5, 4]]
	];
	
//[description, success message. failure message
var ITEMDEFS = [
	["an old, metal lantern", "let there be light!", "there is no need; the area is already lit"],
	["a worn fishing rod. works best when catching fish", "you catch a fish!", "there are no fish to catch"],
	["a single beautiful rose puts to shame all the rest", "you eat it i guess", "there is nobody to accept you gift"],
	["a bright red trout", "you eat it i guess", "you choke"]
	];
	
const IGNORABLES = ["the", "a", "to", "fucking", "on", "with", "for"];
var inventory = [ 0 ];
var parsed = [];

var loc = "intro";
var name;
var state = 0;

var here = 0;

function enter() {
	var val = document.getElementById("box").value;
	document.getElementById("box").value = "";
	
	if(val == "") return;
	
	print("> " + val);
	if(parse(val.split(" ")) == 1)
		parse2();
	print(" ");
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
					return 0;
				}
			}
			count++;
		}
	}
	parsed.push("#");
	//print(inp + "|" + parsed);
	return 1;
}

function parse2() {
	switch(parsed[0]) {
		case 0:
			state = 0;
			help(parsed[1]);
			break;
		case 1:
			state = 0;
			clear();
			break;
		case 2:
			state = 0;
			look(parsed[1]);
			break;
		case 3:
			state = 0;
			take(parsed[1]);
			break;
		case 4:
			state = 0;
			print("you have:");
			for(var i = 0; i < inventory.length; i++) {
				print(SYNONYMS[ITEMID + inventory[i]][1].toUpperCase());
			}
			break;
		case 5:
			state = 0;
			drop(parsed[1]);
			break;
		case 6:
			state = 0;
			use(parsed[1]);
			break;
		case 7:
			state = 0;
			go(parsed[1]);
			break;
		default:
			if(state == 1)
				take(parsed[0]);
			else if(state == 2)
				drop(parsed[0]);
			else if(state == 3)
				use(parsed[0]);
			else if(state == 4)
				go(parsed[0]);
			else
				print("i don't understand");
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
	if(val[0] == '>')
		np.appendChild(document.createElement("br"));
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
		if(val >= ITEMID && (inventory.includes(val - ITEMID) || val == ITEMID + ROOMDEFS[here][2])) {
			print(ITEMDEFS[val - ITEMID][0]);
		} else print("you can't see that right now");
	} else {
		print("you are in the " + SYNONYMS[ROOMID + here][0].toUpperCase());
		print(ROOMDEFS[here][0]);
		print("exits are: ");
		for(var i = 0; i < ROOMDEFS[here][1].length; i++)
			print(SYNONYMS[DIRID + ROOMDEFS[here][1][i]][0].toUpperCase());
		if(ROOMDEFS[here][2] != "#")
			print("there is a " + SYNONYMS[ITEMID + ROOMDEFS[here][2]][0].toUpperCase());
	}
}

function take(val) {
	if(val != "#") {
		if(val == ITEMID + ROOMDEFS[here][2]) {
			print("you got the " + SYNONYMS[val][1].toUpperCase() + "!");
			inventory.push(ROOMDEFS[here][2]);
			ROOMDEFS[here][2] = "#";
		} else if(val >= ITEMID)
			print("there is no " + SYNONYMS[val][1].toUpperCase() + " here");
		else
			print("please don't take that");
		state = 0;
	} else {
		print("what would you like to take?");
		state = 1;
	}
}

function drop(val) {
	if(val != "#") {
		if(inventory.includes(val - ITEMID) && ROOMDEFS[here][2] == "#") {
			print("you lost the " + SYNONYMS[val][1].toUpperCase() + "!");
			inventory.splice(inventory.indexOf(val - ITEMID), 1);
			ROOMDEFS[here][2] = val - ITEMID;
		} else if(!inventory.includes(val - ITEMID))
			print("you don't have a " + SYNONYMS[val][1].toUpperCase());
		else if(ROOMDEFS[here][2] != "#")
			print("there is a " + SYNONYMS[ROOMDEFS[here][2] + ITEMID][1].toUpperCase() + " in the way");
		else
			print("please don't lose that");
		state = 0;
	} else {
		print("what would you like to drop?");
		state = 2;
	}
}

function use(val) {
	if(val != "#") {
		if(inventory.includes(val - ITEMID)) {
			print(ITEMDEFS[val - ITEMID][2]);
		} else if(!inventory.includes(val - ITEMID) && val >= ITEMID)
			print("you don't have a " + SYNONYMS[val][1].toUpperCase());
		else
			print("you don't know how to use that");
		state = 0;
	} else {
		print("what will you use?");
		state = 3;
	}
}

function go(val) {
	if(val != "#") {
		var temp = ROOMDEFS[here][1].indexOf(val - DIRID);
		if(temp != -1) {
			print("you go " + SYNONYMS[val][0].toUpperCase());
			here = ROOMDEFS[here][3][temp];
			look("#");
		} else if(!ROOMDEFS.includes(val - DIRID) && val >= DIRID && val < ROOMID)
			print("there is no exit " + SYNONYMS[val][0].toUpperCase());
		else
			print("you can't go that way");
		state = 0;
	} else {
		print("where will you go?");
		state = 4;
	}
}
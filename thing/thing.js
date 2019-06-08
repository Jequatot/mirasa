//look after load
//containers
//room object queues
//use on
//talk
//reset / restart
//take all
//arrow keys copy previous commands

/*
command		synonyms	definition
direction	synonyms
room		description	exits		exit locations	items		visited?
item		synonyms	description	properties		contents	verbs		uses	results		held?

["rose", ["flower", "red rose"], "a beautiful flower", 15, [], [4, 6], [[14],['#']], ["she takes it", they dont want it"], [""]]

npc			synonyms	description	talk			subjects	talk abouts

equipment?
*/
const DIRID = 12;
const ROOMID = DIRID + 8;
const ITEMID = ROOMID + 13;

const NEWROOMSCORE = 2;
const NEWITEMSCORE = 5;

const SYNONYMS = [
	//commands
	["help", "h"],
	["clear", "c"],
	["look", "l", "examine", "consider"],
	["take", "grab", "get", "acquire", "pick up"],
	["inventory", "i", "items"],
	["drop", "place", "put down", "put"],
	["use", "give"],
	["go", "move", "walk"],
	["save", "sav"],
	["load", "lod"],
	["sit", "sit down"],
	["talk"],
	
	//directions
	["north", "n"],
	["south", "s"],
	["east", "e"],
	["west", "w"],
	["up", "u"],
	["down", "d"],
	["out", "outside", "leave"],
	["in", "inside", "enter"],
	
	//rooms
	["cottage"],
	["garden path"],
	["fishing pond", "pond"],
	["winding path"],
	["treetop"],
	["drawbridge"],
	["courtyard"],
	["dungeon stairs"],
	["dungeon"],
	["tower stairs"],
	["tower"],
	["great feasting hall"],
	["throne room"],
	
	//items
	["metal lantern", "lantern", "lamp", "light"],										//0
	["worn fishing pole", "fishing rod", "rod", "frod", "pole", "fishing pole"],//1
	["rosebush", "red rose", "rose", "flower", "bush"],									//2
	["salmon", "fish"],															//3
	["branch", "stick"],														//4
	["mean troll blocking the gate", "mean troll", "troll"],					//5
	["contented troll", "mean troll", "troll"],									//6
	["castle guard blocking the eastern gate", "guard"],													//7
	["rusted key", "key", "rusty key"],											//8
	["darkness blocking your way down", "darkness", "dark"],					//9
	["golden crown", "crown"],													//10
	["princess", "her highness"],																//11
	["strange candle", "candle"],												//12
	["golden throne", "throne"],												//13
	["ghost", "phantom"],
	["locked door", "lock", "door"]
];

const COMMDEFS = [
	"get a list of commands, or use with a specific command (ie 'help look')",
	"clear previous commands",
	"examine surroundings",
	"add an item to your inventory",
	"look at the items you've obtained", 
	"leave an item behind",
	"make use of an item. how this is done is based on context",
	"leave your location and see the world. you can also move by just typing " + 
	"the direction you wish to go (> SOUTH), or sometimes even just the first letter (> S)",
	"save your progress using cookies. when you reload the page, it will remember your name",
	"load a previous save, only possible if you have saved",
	"sit down on some sittable object",
	"make conversation. use with another object, ie 'talk princess'"
	];

//[description, exits. item, exit locations, has been entered
var ROOMDEFS = [
	["dusty and dilapidated, but nonetheless you call it home", [6], 1, [1], true],	//0
	["a lush garden path outside your cottage", [0, 1, 7], 2, [3, 2, 0], false],	//1
	["the edge of a small pond; there are plenty of fish jumping about", [0], "#", [1], false],								//2
	["a tall tree looms over you - looks climbable", [1, 2, 4], "#", [1, 5, 4], false],				//3
	["the top of the tall tree - you can see your home from here!", [5], 4, [3], false],								//4
	["a drawbridge leading to the castle", [3], 5, [3, 6], false],					//5
	["plenty of flowers line the grounds", [3, 4, 5], 7, [5, 9, 7, 11], false],							//6
	["dark stairs leading down to the dungeon", [4], 9, [6, 8], false],				//7
	["dark and eerie, metal and dank", [4], 14, [7], false],							//8
	["what might be past this door?", [5], 15, [6, 10], false],							//9
	["sunlight pours over the princess' bed as she stands before you", [5], 11, [9], false],
	["spoiled food lays across the table. nobody has been here in a while", [2, 3], 12, [12, 6], false],
	["a crimson carpet leads a path to the golden throne", [3], 13, [11]]
	];
	
//[description, success message. failure message, has been picked up, can be picked up
var ITEMDEFS = [
	["an old, metal lantern", "let there be light!", "there is no need - the area is already lit", true, true],
	["a worn fishing rod. works best when catching fish", "you catch a FISH!", "there are no fish to catch", false, true],
	["a single beautiful ROSE puts to shame all the rest. a perfect gift", "she eats it i guess", "there is nobody to accept your gift", false, true],
	["a big red salmon. you personally wouldn't eat it raw, but somebody less discerning might", "the TROLL ravenously takes your gift, and chews on it hungrily", "you better not be trying to eat it", false, true],
	["a heavy old withered stick. looks like it could snap under its own weight", "you whack the guard unconscious", "please be more careful - you could hurt yourself", false, true],
	["a mean troll. or maybe he's just hungry?", "", "", false, false],
	["it seems he was just hungry after all", "", "", false, false],
	["an imposing guard stands ready", "", "", false, false],													//7
	["a key which looks like it hasn't seen use in a while", "the door opened", "there is no door to unlock", false, true],
	["you can't go down the stairs like this", "", "", false, false],					//9
	["fit for a monarch", "\"you are crowned. go take thy throne, monarch\"", "to place the crown upon your own head would be pretty conceited, wouldn't it?", false, true],
	["\"Were someone to find the crown, they could be our new monarch\"", "", "\"*SLAP* I am not that kind of woman!\"", false, false],																//11
	["strange, acrid-smelling", "the ghost flees", "an odd odor is emitted", false, true],
	["fit for a monarch", "", "", false, false],												//13
	["ghost with bony fingers and a golden crown", "", "", false, false],
	["a key would be sure to do the trick", "", "", false, false]
	];
	
const IGNORABLES = ["the", "a", "to", "fucking", "on", "with", "for", "small", "about"];
var inventory = [ 0 ];
var parsed = [];

var loc = "intro";
var name;
var state = 0;

var here = 0;

var score = 0;

var crowned = false;
var name = "";

window.onload = init;

function init() {
	print("WELCOME TO ACTION CASTLE V1.1");
	print("enter your NAME to start a new save");
	print("or type LOAD to bring up a previous save");
	state = 17;
}

function enter() {
	var val = document.getElementById("box").value;
	document.getElementById("box").value = "";
	
	if(val == "") return;
	
	print("> " + val);
	
	if(state == 17 && !val.toLowerCase().includes("help")) {
		if(val.toLowerCase() == "load") {
			if(!load())
				return;
			print("welcome back " + name);
		} else {
			name = val;
			print("hello " + name);
		}
		look("#");
		state = 0;
		return;
	}
	
	if(parse(val.split(" ")) == 1)
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
						try{
							if(inp[i].toLowerCase() == temp[0] &&
							inp[i + 1].toLowerCase() == temp[1]) {
								parsed.push(j);
								i++;
							}
						}
						catch(e){
							
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
		case 8:
			save();
			break;
		case 9:
			if(load())
				look('#');
			break;
		case 10:
			if(here == 12)
				if(crowned) {
					print("YOU WIN!!");
					score += 5;
				} else print("only the crowned may sit here");
			else print("nothing here looks made-for-sitting...");
			break;
		case 11:
			if(parsed[1] == '#')
				talk('#', '#');
			else talk(parsed[1], parsed[2]);
			break;
		default:
			if(state == 1)
				take(parsed[0]);
			else if(state == 2)
				drop(parsed[0]);
			else if(state == 3)
				use(parsed[0]);
			else if(state == 4 || (parsed[0] >= DIRID && parsed[0] < ROOMID))
				go(parsed[0]);
			else if(state == 5) {
				talk(parsed[0], parsed[1]);
			}
			else {
				print("i don't understand");
			}
	}
	
	document.getElementById("scr").innerHTML = "SCORE: " + score;
	
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
	if(val[0] == '>') np.innerHTML = '<br>';
	np.innerHTML += val;
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
		if(val == ITEMID + ROOMDEFS[here][2] && ITEMDEFS[ROOMDEFS[here][2]][4]) {
			print("you got the " + SYNONYMS[val][1].toUpperCase() + "!");
			inventory.push(ROOMDEFS[here][2]);
			ROOMDEFS[here][2] = "#";
			if(!ITEMDEFS[val - ITEMID][3]) {
				score += NEWITEMSCORE;
				ITEMDEFS[val - ITEMID][3] = true;
			}
		} else if(val == ITEMID + ROOMDEFS[here][2] && !ITEMDEFS[ROOMDEFS[here][2]][4]) {
			if(val - ITEMID == 11)
				print(ITEMDEFS[val - ITEMID][2]);
			else
				print("the " + SYNONYMS[val][1].toUpperCase() + " is too big to take");
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
			if(here == 2 && val == ITEMID + 1) {
				print(ITEMDEFS[val - ITEMID][1]);
				inventory.push(3);
				score += NEWITEMSCORE;
				ITEMDEFS[val - ITEMID][3] = true;
				print("but your FISHING ROD snapped");
				inventory.splice(inventory.indexOf(1), 1);
			}
			else if(here == 5 && val == ITEMID + 3) {
				print(ITEMDEFS[val - ITEMID][1]);
				score += 10;
				print("the EAST gate is now open");
				ROOMDEFS[here][1].push(2);
				ROOMDEFS[here][2] = 6;
				inventory.splice(inventory.indexOf(3), 1);
				SYNONYMS[ITEMID + 5] = [];
			}
			else if(here == 6 && val == ITEMID + 4) {
				print(ITEMDEFS[val - ITEMID][1]);
				score += 10;
				print("but your STICK snapped");
				inventory.splice(inventory.indexOf(4), 1);
				print("the GUARD dropped a RUSTED KEY");
				ROOMDEFS[here][2] = 8;
				print("the EAST gate is now open");
				ROOMDEFS[here][1].push(2);
			}
			else if(here == 7 && val == ITEMID) {
				print(ITEMDEFS[val - ITEMID][1]);
				print("the stairs DOWN are now visible");
				if(ROOMDEFS[here][1].length <= 1) {
					ROOMDEFS[here][2] = "#";
					ROOMDEFS[here][1].push(5);
				}
			}
			else if(here == 8 && val == ITEMID + 12) {
				print(ITEMDEFS[val - ITEMID][1]);
				score += 10;
				print("the GHOST dropped a GOLDEN CROWN");
				ROOMDEFS[here][2] = 10;
			}
			else if(here == 9 && val == ITEMID + 8) {
				print(ITEMDEFS[val - ITEMID][1]);
				ROOMDEFS[here][2] = "#";
				print("the UP door is now open");
				ROOMDEFS[here][1].push(4);
			}
			else if(here == 10 && val == ITEMID + 2) {
				print(ITEMDEFS[val - ITEMID][1]);
				score += 5;
				inventory.splice(inventory.indexOf(2), 1);
			}
			else if(here == 10 && val == ITEMID + 10) {
				print(ITEMDEFS[val - ITEMID][1]);
				inventory.splice(inventory.indexOf(10), 1);
				crowned = true;
			}
			else
				print(ITEMDEFS[val - ITEMID][2]);
		} else if(!inventory.includes(val - ITEMID) && val >= ITEMID) {
			if(here == 10 && val - ITEMID == 11)
				print(ITEMDEFS[val - ITEMID][2]);
			else
				print("you don't have a " + SYNONYMS[val][1].toUpperCase());
		} else
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
			document.getElementById("loc").innerHTML = SYNONYMS[ROOMID + here][0].toUpperCase();
			if(!ROOMDEFS[here][4]) {
				look("#");
				score += NEWROOMSCORE;
				ROOMDEFS[here][4] = true;
			} else print("you are at the " + SYNONYMS[ROOMID + here][0].toUpperCase());
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

function save() {
	deleteAllCookies();
	document.cookie =  here + '##' + JSON.stringify(inventory) + '##' + JSON.stringify(ITEMDEFS) + '##' + JSON.stringify(ROOMDEFS) + '##' + SYNONYMS[ROOMID + here][0] + '##' + name + '##' + score;
	print("Saved!");
}

function load() {
	if(document.cookie.length < 2) {
		print("no save found");
		return false;
	}
	inventory = (document.cookie).split('##');
	here = parseInt(inventory[0]);
	ITEMDEFS = JSON.parse(inventory[2]);
	ROOMDEFS = JSON.parse(inventory[3]);
	name = inventory[5];
	score = parseInt(inventory[6]);
	inventory =  JSON.parse(inventory[1]);
	return true;
}

function talk(to, about) {
	if(to != '#') {
		if(to == ITEMID + ROOMDEFS[here][2]){
			if(to == 5 + ITEMID) print('he only glares at you hungrily');
			else if(to == 6 + ITEMID) print('best not disturb him');
			else if(to == 7 + ITEMID) print('"show me your skill with a weapon!"');
			else if(to == 11 + ITEMID) {
				if(Math.floor(Math.random()*3) == 0)
					print('"only the CROWNED may sit on the throne"');
				else if(Math.floor(Math.random()*3) == 0)
					print('"my father always feared that old candle"');
				else if(Math.floor(Math.random()*3) == 0)
					print('"ghosts are weak to strange smells"');
				else if(Math.floor(Math.random()*3) == 0)
					print('"have you met my father?"');
				else if(Math.floor(Math.random()*3) == 0)
					print('"do you watch Game of Thrones?"');
				else
					print('"hrm"');
			}
			else if(to == 14 + ITEMID) print('he moans ghostily');
			else print("they dont seem up for conversation");
		} else print("they can't hear you right now");
	} else {
		print("who are you talking to?");
		state = 5;
	}
}

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    }
}
/*
function encode(val) {
	val = val.toLowerCase();
	var result = "";
	for(var i = 0; i < val.length; i++) {
		if(val[i].charCodeAt(0) > 96 && val[i].charCodeAt(0) < 123)
			result += ((val[i].charCodeAt(0) + i - 97)%26).toString(26);
		else result += val[i];
	}
	return result;
}

function decode(val) {
	var result = "";
	for(var i = 0; i < val.length; i++) {
		if(val[i].charCodeAt(0) > 96 && val[i].charCodeAt(0) < 123)
			result += ((val[i].charCodeAt(0) + i - 97)%26).toString(26);
		else result += val[i];
	}
	return result;
} */
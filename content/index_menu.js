var menu_content = [
	{
		"name" : "home",
		"content" : [
			{
				"title" : "<span>Overview</span>",
				"action" : "gothere('views/home/overview.html')"
			},
			{
				"title" : "<span>Character Creation</span>",
				"action" : "NODE"
			},
			{
				"title" : "Ancestries",
				"action" : "changemenu('ancestries')"
			},
			{
				"title" : "Novice Paths",
				"action" : "changemenu('npaths')"
			},
			{
				"title" : "Expert Paths",
				"action" : "changemenu('epaths')"
				//"action" : "gothere('views/epaths/overview.html')"
			},
			{
				"title" : "Master Paths",
				"action" : "changemenu('mpaths')"
				//"action" : "gothere('views/mpaths/overview.html')"
			},
			{
				"title" : "Professions & Languages",
				"action" : "gothere('views/professions.html')"
			},
			{
				"title" : "<span>Rules</span>",
				"action" : "NODE"
			},
			{
				"title" : "Combat",
				"action" : "changemenu('combat')"
			},
			{
				"title" : "Spells",
				"action" : "changemenu('spells')"
			},
			{
				"title" : "Equipment",
				"action" : "gothere('views/equipment.html')"
			},
			{
				"title" : "Gear",
				"action" : "gothere('views/gear.html')"
			},
			{
				"title" : "<span>A Land in Shadow</span>",
				"action" : "NODE"
			},
			{
				"title" : "The Archipelago",
				"action" : "gothere('views/archipelago.html')"
			},
			{
				"title" : "Gods of Ikseira",
				"action" : "gothere('views/gods.html')"
			},
			{
				"title" : "DATE",
				"action" : "NODE"
			}
		]
	},
	{
		"name" : "ancestries",
		"content" : [
			{
				"title" : "&lt==",
				"action" : "changemenu('home')"
			},
			{
				"title" : "<span>Ancestries</span>",
				"action" : "NODE"
			},
			{
				"title" : "<span>Overview</span>",
				"action" : "gothere('views/ancestries/overview.html')"
			},
			{
				"title" : "Human",
				"action" : "gothere('views/ancestries/human.html')"
			},
			{
				"title" : "Beastmen",
				"action" : "gothere('views/ancestries/beastmen.html')"
			},
			{
				"title" : "Cambion",
				"action" : "gothere('views/ancestries/cambion.html')"
			},
			{
				"title" : "Clockwork",
				"action" : "gothere('views/ancestries/clockwork.html')"
			},
			{
				"title" : "Drakken",
				"action" : "gothere('views/ancestries/drakken.html')"
			},
			{
				"title" : "Goblin",
				"action" : "gothere('views/ancestries/goblin.html')"
			}
		]
	},
	{
		"name" : "combat",
		"content" : [
			{
				"title" : "&lt==",
				"action" : "changemenu('home')"
			},
			{
				"title" : "<span>Combat</span>",
				"action" : "NODE"
			},
			{
				"title" : "<span>Overview</span>",
				"action" : "gothere('views/combat/overview.html')"
			},
			{
				"title" : "Making Attacks",
				"action" : "gothere('views/combat/attacks.html')"
			},
			{
				"title" : "Afflictions",
				"action" : "gothere('views/combat/afflictions.html')"
			},
			{
				"title" : "Corruption",
				"action" : "gothere('views/combat/corruption.html')"
			},
			{
				"title" : "Fate Rolls",
				"action" : "gothere('views/combat/fate.html')"
			},
			{
				"title" : "Fortune Points",
				"action" : "gothere('views/combat/fortune.html')"
			},
			{
				"title" : "Insanity",
				"action" : "gothere('views/combat/insanity.html')"
			},
			{
				"title" : "Resting",
				"action" : "gothere('views/combat/resting.html')"
			},
			{
				"title" : "DATE",
				"action" : "NODE"
			}
		]
	},
	{
		"name" : "spells",
		"content" : [
			{
				"title" : "&lt==",
				"action" : "changemenu('home')"
			},
			{
				"title" : "<span>Spells</span>",
				"action" : "NODE"
			},
			{
				"title" : "<span>Overview</span>",
				"action" : "gothere('views/spells/overview.html')"
			},
			{
				"title" : "Traditions",
				"action" : "gothere('views/spells/traditions.html')"
			},
			{
				"title" : "Spell List",
				"action" : "gothere('views/spells/spell_list.html')"
			},
			{
				"title" : "Old Spell List",
				"action" : "gothere('views/spells/index.html')"
			}
		]
	},
	{
		"name" : "npaths",
		"content" : [
			{
				"title" : "&lt==",
				"action" : "changemenu('home')"
			},
			{
				"title" : "<span>Novice Paths</span>",
				"action" : "NODE"
			},
			{
				"title" : "<span>Overview</span>",
				"action" : "gothere('views/npaths/overview.html')"
			},
			{
				"title" : "Magician",
				"action" : "gothere('views/paths/caster.html')"
			},
			{
				"title" : "Priest",
				"action" : "gothere('views/paths/spellsword.html')"
			},
			{
				"title" : "Rogue",
				"action" : "gothere('views/paths/rogue.html')"
			},
			{
				"title" : "Warrior",
				"action" : "gothere('views/paths/warrior.html')"
			}
		]
	},
	{
		"name" : "epaths",
		"content" : [
			{
				"title" : "&lt==",
				"action" : "changemenu('home')"
			},
			{
				"title" : "<span>Expert Paths</span>",
				"action" : "NODE"
			},
			{
				"title" : "<span>Overview</span>",
				"action" : "gothere('views/epaths/overview.html')"
			},
			{
				"title" : "<span>Paths of Faith</span>",
				"action" : "NODE"
			},
			{
				"title" : "Cleric",
				"action" : "gothere('views/epaths/cleric.html')"
			},
			{
				"title" : "Druid",
				"action" : "gothere('views/epaths/druid.html')"
			},
			{
				"title" : "Oracle",
				"action" : "gothere('views/epaths/oracle.html')"
			},
			{
				"title" : "Paladin",
				"action" : "gothere('views/epaths/paladin.html')"
			},
			{
				"title" : "<span>Paths of Power</span>",
				"action" : "NODE"
			},
			{
				"title" : "Artificer",
				"action" : "gothere('views/epaths/artificer.html')"
			},
			{
				"title" : "Sorcerer",
				"action" : "gothere('views/epaths/sorcerer.html')"
			},
			{
				"title" : "Wardscribe",
				"action" : "gothere('views/epaths/wardscribe.html')"
			},
			{
				"title" : "Wizard",
				"action" : "gothere('views/epaths/wizard.html')"
			},
			{
				"title" : "<span>Paths of Trickery</span>",
				"action" : "NODE"
			},
			{
				"title" : "Assassin",
				"action" : "gothere('views/epaths/assassin.html')"
			},
			{
				"title" : "Scout",
				"action" : "gothere('views/epaths/scout.html')"
			},
			{
				"title" : "Thief",
				"action" : "gothere('views/epaths/thief.html')"
			},
			{
				"title" : "Warlock",
				"action" : "gothere('views/epaths/warlock.html')"
			},
			{
				"title" : "<span>Paths of War</span>",
				"action" : "NODE"
			},
			{
				"title" : "Berserker",
				"action" : "gothere('views/epaths/berserker.html')"
			},
			{
				"title" : "Fighter",
				"action" : "gothere('views/epaths/fighter.html')"
			},
			{
				"title" : "Ranger",
				"action" : "gothere('views/epaths/ranger.html')"
			},
			{
				"title" : "Spellbinder",
				"action" : "gothere('views/epaths/spellbinder.html')"
			},
			{
				"title" : "DATE",
				"action" : "NODE"
			}
		]
	},
	{
		"name" : "mpaths",
		"content" : [
			{
				"title" : "&lt==",
				"action" : "changemenu('home')"
			},
			{
				"title" : "<span>Overview</span>",
				"action" : "gothere('views/mpaths/overview.html')"
			},
			{
				"title" : "<span>Magic Master Paths</span>",
				"action" : "NODE"
			},
			{
				"title" : "A - B",
				"action" : "gothere('views/mpaths/mA.html')"
			},
			{
				"title" : "C - E",
				"action" : "gothere('views/mpaths/mC.html')"
			},
			{
				"title" : "G - M",
				"action" : "gothere('views/mpaths/mH.html')"
			},
			{
				"title" : "N - S",
				"action" : "gothere('views/mpaths/mN.html')"
			},
			{
				"title" : "T - W",
				"action" : "gothere('views/mpaths/mT.html')"
			},
			{
				"title" : "<span>Skill Master Paths</span>",
				"action" : "NODE"
			},
			{
				"title" : "A - C",
				"action" : "gothere('views/mpaths/sA.html')"
			},
			{
				"title" : "D",
				"action" : "gothere('views/mpaths/sD.html')"
			},
			{
				"title" : "E - I",
				"action" : "gothere('views/mpaths/sE.html')"
			},
			{
				"title" : "J - R",
				"action" : "gothere('views/mpaths/sJ.html')"
			},
			{
				"title" : "S - Z",
				"action" : "gothere('views/mpaths/sS.html')"
			},
		]
	}
];

var music_content = [
	'<iframe style="border: 0; width: 170px; height: 170px;" src="https://bandcamp.com/EmbeddedPlayer/album=1251308296/size=large/bgcol=ffffff/linkcol=0687f5/minimal=true/transparent=true/" seamless><a href="http://mortgarson.bandcamp.com/album/mother-earths-plantasia">Mother Earth&#39;s Plantasia by Mort Garson</a></iframe>',
	'<iframe style="border: 0; width: 170px; height: 170px;" src="https://bandcamp.com/EmbeddedPlayer/album=517238578/size=large/bgcol=ffffff/linkcol=0687f5/minimal=true/" seamless><a href="http://chillhop.bandcamp.com/album/chillhop-essentials-summer-2019" >Chillhop Essentials Summer 2019 by Chillhop Music</a></iframe>',
	'<iframe style="border: 0; width: 170px; height: 170px;" src="https://bandcamp.com/EmbeddedPlayer/album=2322633469/size=large/bgcol=ffffff/linkcol=0687f5/minimal=true/transparent=true/" seamless><a href="http://maxoisnuts.bandcamp.com/album/fakebit-2010">FAKEBIT 2010 by Maxo</a></iframe>',
	'<iframe style="border: 0; width: 170px; height: 170px;" src="https://bandcamp.com/EmbeddedPlayer/album=3261100776/size=large/bgcol=ffffff/linkcol=0687f5/minimal=true/transparent=true/" seamless><a href="http://viennateng.bandcamp.com/album/aims">Aims by Vienna Teng</a></iframe>'
];
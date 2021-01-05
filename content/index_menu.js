var menu_content = [
	{
		"name" : "home",
		"content" : [
			{
				"title" : "<span>Home</span>",
				"action" : "NODE"
			},
			{
				"title" : "<span>Overview</span>",
				"action" : "gothere('views/home/overview.html')"
			},
			{
				"title" : "Ancestries",
				"action" : "changemenu('ancestries')"
			},
			{
				"title" : "Professions & Languages",
				"action" : "gothere('views/professions.html')"
			},
			{
				"title" : "Combat",
				"action" : "changemenu('combat')"
			},
			{
				"title" : "Novice Paths",
				"action" : "changemenu('npaths')"
			},
			{
				"title" : "Spells",
				"action" : "gothere('views/spells/index.html')"
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
				"title" : "Ancestries",
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
				"title" : "combat",
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
				"title" : "Fortune & Fate",
				"action" : "gothere('views/combat/fortune.html')"
			},
			{
				"title" : "Afflictions",
				"action" : "gothere('views/combat/afflictions.html')"
			},
			{
				"title" : "DATE",
				"action" : "NODE"
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
				"title" : "Novice Paths",
				"action" : "NODE"
			},
			{
				"title" : "<span>Overview</span>",
				"action" : "gothere('views/paths/overview.html')"
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
				"title" : "Expert Paths",
				"action" : "NODE"
			},
			{
				"title" : "<span>Overview</span>",
				"action" : "gothere('views/epaths/overview.html')"
			},
			{
				"title" : "Artificer",
				"action" : "gothere('views/paths/artificer.html')"
			},
			{
				"title" : "Assassin",
				"action" : "gothere('views/paths/assassin.html')"
			},
			{
				"title" : "Berserker",
				"action" : "gothere('views/paths/berserker.html')"
			},
			{
				"title" : "Cleric",
				"action" : "gothere('views/paths/cleric.html')"
			},
			{
				"title" : "Druid",
				"action" : "gothere('views/paths/Druid.html')"
			},
			{
				"title" : "Fighter",
				"action" : "gothere('views/paths/Fighter.html')"
			},
			{
				"title" : "Oracle",
				"action" : "gothere('views/paths/Oracle.html')"
			},
			{
				"title" : "Paladin",
				"action" : "gothere('views/paths/Paladin.html')"
			},
			{
				"title" : "Ranger",
				"action" : "gothere('views/paths/Ranger.html')"
			},
			{
				"title" : "Scout",
				"action" : "gothere('views/paths/Scout.html')"
			},
			{
				"title" : "Sorcerer",
				"action" : "gothere('views/paths/Sorcerer.html')"
			},
			{
				"title" : "Spellbinder",
				"action" : "gothere('views/paths/Spellbinder.html')"
			},
			{
				"title" : "Thief",
				"action" : "gothere('views/paths/Thief.html')"
			},
			{
				"title" : "Warlock",
				"action" : "gothere('views/paths/Warlock.html')"
			},
			{
				"title" : "Witch",
				"action" : "gothere('views/paths/Witch.html')"
			},
			{
				"title" : "Wizard",
				"action" : "gothere('views/paths/Wizard.html')"
			}
		]
	},
	{
		"name" : "mmpaths",
		"content" : [
			{
				"title" : "&lt==",
				"action" : "changemenu('home')"
			},
			{
				"title" : "Magic Master Paths",
				"action" : "NODE"
			},
			{
				"title" : "<span>Overview</span>",
				"action" : "gothere('views/mmpaths/overview.html')"
			},
			{
				"title" : "Abjurer",
				"action" : "gothere('views/paths/Abjurer.html')"
			},
			{
				"title" : "Aeromancer",
				"action" : "gothere('views/paths/Aeromancer.html')"
			},
			{
				"title" : "Apocalyptist",
				"action" : "gothere('views/paths/Apocalyptist.html')"
			},
			{
				"title" : "Arcanist",
				"action" : "gothere('views/paths/Arcanist.html')"
			},
			{
				"title" : "Astromancer",
				"action" : "gothere('views/paths/Astromancer.html')"
			},
			{
				"title" : "Bard",
				"action" : "gothere('views/paths/Bard.html')"
			},
			{
				"title" : "Beastmaster",
				"action" : "gothere('views/paths/Beastmaster.html')"
			},
			{
				"title" : "Chronomancer",
				"action" : "gothere('views/paths/Chronomancer.html')"
			},
			{
				"title" : "Conjurer",
				"action" : "gothere('views/paths/Conjurer.html')"
			},
			{
				"title" : "Destroyer",
				"action" : "gothere('views/paths/Destroyer.html')"
			},
			{
				"title" : "Diviner",
				"action" : "gothere('views/paths/Diviner.html')"
			},
			{
				"title" : "Enchanter",
				"action" : "gothere('views/paths/Enchanter.html')"
			},
			{
				"title" : "Geomancer",
				"action" : "gothere('views/paths/Geomancer.html')"
			},
			{
				"title" : "Healer",
				"action" : "gothere('views/paths/Healer.html')"
			},
			{
				"title" : "Hexer",
				"action" : "gothere('views/paths/Hexer.html')"
			},
			{
				"title" : "Hydromancer",
				"action" : "gothere('views/paths/Hydromancer.html')"
			},
			{
				"title" : "Illusionist",
				"action" : "gothere('views/paths/Illusionist.html')"
			},
			{
				"title" : "Mage Knight",
				"action" : "gothere('views/paths/mageknight.html')"
			},
			{
				"title" : "Magus",
				"action" : "gothere('views/paths/Magus.html')"
			},
			{
				"title" : "Necromancer",
				"action" : "gothere('views/paths/Necromancer.html')"
			},
			{
				"title" : "Pyromancer",
				"action" : "gothere('views/paths/Pyromancer.html')"
			},
			{
				"title" : "Runesmith",
				"action" : "gothere('views/paths/Runesmith.html')"
			},
			{
				"title" : "Savant",
				"action" : "gothere('views/paths/Savant.html')"
			},
			{
				"title" : "Shapeshifter",
				"action" : "gothere('views/paths/Shapeshifter.html')"
			},
			{
				"title" : "Stormbringer",
				"action" : "gothere('views/paths/Stormbringer.html')"
			},
			{
				"title" : "Technomancer",
				"action" : "gothere('views/paths/Technomancer.html')"
			},
			{
				"title" : "Tenebrist",
				"action" : "gothere('views/paths/Tenebrist.html')"
			},
			{
				"title" : "Thaumaturge",
				"action" : "gothere('views/paths/Thaumaturge.html')"
			},
			{
				"title" : "Theurge",
				"action" : "gothere('views/paths/Theurge.html')"
			},
			{
				"title" : "Transmuter",
				"action" : "gothere('views/paths/Transmuter.html')"
			},
			{
				"title" : "Traveler",
				"action" : "gothere('views/paths/Traveler.html')"
			},
			{
				"title" : "Woodwose",
				"action" : "gothere('views/paths/Woodwose.html')"
			}
		]
	},
	{
		"name" : "smpaths",
		"content" : [
			{
				"title" : "&lt==",
				"action" : "changemenu('home')"
			},
			{
				"title" : "Skill Master Paths",
				"action" : "NODE"
			},
			{
				"title" : "<span>Overview</span>",
				"action" : "gothere('views/smpaths/overview.html')"
			},
			{
				"title" : "Acrobat",
				"action" : "gothere('views/paths/Acrobat.html')"
			},
			{
				"title" : "Avenger",
				"action" : "gothere('views/paths/Avenger.html')"
			},
			{
				"title" : "Blade",
				"action" : "gothere('views/paths/Blade.html')"
			},
			{
				"title" : "Brute",
				"action" : "gothere('views/paths/Brute.html')"
			},
			{
				"title" : "Cavalier",
				"action" : "gothere('views/paths/Cavalier.html')"
			},
			{
				"title" : "Champion",
				"action" : "gothere('views/paths/Champion.html')"
			},
			{
				"title" : "Chaplain",
				"action" : "gothere('views/paths/Chaplain.html')"
			},
			{
				"title" : "Conquerer",
				"action" : "gothere('views/paths/Conquerer.html')"
			},
			{
				"title" : "Death Dealer",
				"action" : "gothere('views/paths/deathdealer.html')"
			},
			{
				"title" : "Defender",
				"action" : "gothere('views/paths/Defender.html')"
			},
			{
				"title" : "Dervish",
				"action" : "gothere('views/paths/Dervish.html')"
			},
			{
				"title" : "Diplomat",
				"action" : "gothere('views/paths/Diplomat.html')"
			},
			{
				"title" : "Dreadnaught",
				"action" : "gothere('views/paths/Dreadnaught.html')"
			},
			{
				"title" : "Duelist",
				"action" : "gothere('views/paths/Duelist.html')"
			},
			{
				"title" : "Engineer",
				"action" : "gothere('views/paths/Engineer.html')"
			},
			{
				"title" : "Executioner",
				"action" : "gothere('views/paths/Executioner.html')"
			},
			{
				"title" : "Exorcist",
				"action" : "gothere('views/paths/Exorcist.html')"
			},
			{
				"title" : "Explorer",
				"action" : "gothere('views/paths/Explorer.html')"
			},
			{
				"title" : "Gladiator",
				"action" : "gothere('views/paths/Gladiator.html')"
			},
			{
				"title" : "Gunslinger",
				"action" : "gothere('views/paths/Gunslinger.html')"
			},
			{
				"title" : "Infiltrator",
				"action" : "gothere('views/paths/Infiltrator.html')"
			},
			{
				"title" : "Inquisitor",
				"action" : "gothere('views/paths/Inquisitor.html')"
			},
			{
				"title" : "Jack-of-All-Trades",
				"action" : "gothere('views/paths/jackofalltrades.html')"
			},
			{
				"title" : "Marauder",
				"action" : "gothere('views/paths/Marauder.html')"
			},
			{
				"title" : "Miracle Worker",
				"action" : "gothere('views/paths/miracleworker.html')"
			},
			{
				"title" : "Myrmidon",
				"action" : "gothere('views/paths/Myrmidon.html')"
			},
			{
				"title" : "Poisoner",
				"action" : "gothere('views/paths/Poisoner.html')"
			},
			{
				"title" : "Sentinel",
				"action" : "gothere('views/paths/Sentinel.html')"
			},
			{
				"title" : "Sharpshooter",
				"action" : "gothere('views/paths/Sharpshooter.html')"
			},
			{
				"title" : "Templar",
				"action" : "gothere('views/paths/Templar.html')"
			},
			{
				"title" : "Weapon Master",
				"action" : "gothere('views/paths/weaponmaster.html')"
			},
			{
				"title" : "Zealot",
				"action" : "gothere('views/paths/Zealot.html')"
			}
		]
	}
];

var music_content = [
	'<iframe style="border: 0; width: 170px; height: 170px;" src="https://bandcamp.com/EmbeddedPlayer/album=1251308296/size=large/bgcol=ffffff/linkcol=0687f5/minimal=true/transparent=true/" seamless><a href="http://mortgarson.bandcamp.com/album/mother-earths-plantasia">Mother Earth&#39;s Plantasia by Mort Garson</a></iframe>',
	'<iframe style="border: 0; width: 170px; height: 170px;" src="https://bandcamp.com/EmbeddedPlayer/album=517238578/size=large/bgcol=ffffff/linkcol=0687f5/minimal=true/" seamless><a href="http://chillhop.bandcamp.com/album/chillhop-essentials-summer-2019" >Chillhop Essentials Summer 2019 by Chillhop Music</a></iframe>',
	'<iframe style="border: 0; width: 170px; height: 170px;" src="https://bandcamp.com/EmbeddedPlayer/album=2322633469/size=large/bgcol=ffffff/linkcol=0687f5/minimal=true/transparent=true/" seamless><a href="http://maxoisnuts.bandcamp.com/album/fakebit-2010">FAKEBIT 2010 by Maxo</a></iframe>',
	'<iframe style="border: 0; width: 170px; height: 170px;" src="https://bandcamp.com/EmbeddedPlayer/album=3261100776/size=large/bgcol=ffffff/linkcol=0687f5/minimal=true/transparent=true/" seamless><a href="http://viennateng.bandcamp.com/album/aims">Aims by Vienna Teng</a></iframe>'
];
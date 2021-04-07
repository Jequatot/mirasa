var menu_content = [
	{
		"name" : "home",
		"content" : [
			{
				"title" : "<a href='index.html'>Overview</a>",
				"action" : "index"
			},
			{
				"title" : "Character Creation",
				"action" : "NODE"
			},
			{
				"title" : "<a href='ancestries/overview.html'>Ancestries</a>",
				"action" : "ancestries"
			},
			{
				"title" : '<a href="npaths/overview.html">Novice Paths</a>',
				"action" : "npaths"
			},
			{
				"title" : '<a href="epaths/overview.html">Expert Paths</a>',
				"action" : "epaths"
			},
			{
				"title" : '<a href="mpaths/overview.html">Master Paths</a>',
				"action" : "mpaths"
			},
			{
				"title" : '<a href="professions.html">Professions & Languages</a>',
				"action" : "profs"
			},
			{
				"title" : "Rules",
				"action" : "NODE"
			},
			{
				"title" : '<a href="combat/overview.html">Combat</a>',
				"action" : "combat"
			},
			{
				"title" : '<a href="spells/spelllist.html">Spells</a>',
				"action" : "spells"
			},
			{
				"title" : '<a href="equipment.html">Equipment</a>',
				"action" : "equipment"
			},
			{
				"title" : '<a href="gear.html">Gear</a>',
				"action" : "gear"
			},
			{
				"title" : "<span>A Land in Shadow</span>",
				"action" : "NODE"
			},
			{
				"title" : '<a href="archipelago.html">The Archipelago</a>',
				"action" : "archipelago"
			},
			{
				"title" : '<a href="gods.html">Gods of Ikseira</a>',
				"action" : "gods"
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
				"title" : "<a href='../index.html'>&lt==</a>",
				"action" : "home"
			},
			{
				"title" : "Ancestries",
				"action" : "NODE"
			},
			{
				"title" : '<a href="overview.html">Overview</a>',
				"action" : "overview"
			},
			{
				"title" : '<a href="human.html">Human</a>',
				"action" : "human"
			},
			{
				"title" : '<a href="beastmen.html">Beastmen</a>',
				"action" : "beastmen"
			},
			{
				"title" : '<a href="cambion.html">Cambion</a>',
				"action" : "cambion"
			},
			{
				"title" : '<a href="clockwork.html">Clockwork</a>',
				"action" : "clockwork"
			},
			{
				"title" : '<a href="drakken.html">Drakken</a>',
				"action" : "drakken"
			},
			{
				"title" : '<a href="goblin.html">Goblin</a>',
				"action" : 'goblin'
			}
		]
	},
	{
		"name" : "combat",
		"content" : [
			{
				"title" : "<a href='../index.html'>&lt==</a>",
				"action" : "home"
			},
			{
				"title" : "Combat",
				"action" : "NODE"
			},
			{
				"title" : '<a href="overview.html">Overview</a>',
				"action" : "overview"
			},
			{
				"title" : '<a href="attacks.html">Making Attacks</a>',
				"action" : "attacks"
			},
			{
				"title" : '<a href="afflictions.html">Afflictions</a>',
				"action" : "afflictions"
			},
			{
				"title" : '<a href="corruption.html">Corruption</a>',
				"action" : "corruption"
			},
			{
				"title" : '<a href="fate.html">Fate Rolls</a>',
				"action" : "fate"
			},
			{
				"title" : '<a href="fortune.html">Fortune Points</a>',
				"action" : "fortune"
			},
			{
				"title" : '<a href="insanity.html">Insanity</a>',
				"action" : "insanity"
			},
			{
				"title" : '<a href="resting.html">Resting</a>',
				"action" : "resting"
			}
		]
	},
	{
		"name" : "spells",
		"content" : [
			{
				"title" : "<a href='../index.html'>&lt==</a>",
				"action" : "home"
			},
			{
				"title" : "Spells",
				"action" : "NODE"
			},
			{
				"title" : '<a href="spelllist.html">List of Spells</a>',
				"action" : "spelllist"
			},
			{
				"title" : '<a href="spellcasting.html">Spellcasting Rules</a>',
				"action" : "rules"
			},
			{
				"title" : '<a href="traditions.html">Traditions</a>',
				"action" : "traditions"
			}
		]
	},
	{
		"name" : "npaths",
		"content" : [
			{
				"title" : "<a href='../index.html'>&lt==</a>",
				"action" : "home"
			},
			{
				"title" : 'Novice Paths',
				"action" : "NODE"
			},
			{
				"title" : '<a href="overview.html">Overview</a>',
				"action" : "overview"
			},
			{
				"title" : '<a href="magician.html">Magician</a>',
				"action" : "magician"
			},
			{
				"title" : '<a href="priest.html">Priest</a>',
				"action" : "priest"
			},
			{
				"title" : '<a href="rogue.html">Rogue</a>',
				"action" : 'rogue'
			},
			{
				"title" : '<a href="warrior.html">Warrior</a>',
				"action" : 'warrior'
			}
		]
	},
	{
		"name" : "epaths",
		"content" : [
			{
				"title" : "<a href='../index.html'>&lt==</a>",
				"action" : "home"
			},
			{
				"title" : "Expert Paths",
				"action" : "NODE"
			},
			{
				"title" : '<a href="overview.html">Overview</a>',
				"action" : "overview"
			},
			{
				"title" : "Paths of Faith",
				"action" : "NODE"
			},
			{
				"title" : '<a href="cleric.html">Cleric</a>',
				"action" : "gothere('views/epaths/cleric.html')"
			},
			{
				"title" : '<a href="druid.html">Druid</a>',
				"action" : "druid"
			},
			{
				"title" : '<a href="oracle.html">Oracle</a>',
				"action" : "oracle"
			},
			{
				"title" : '<a href="paladin.html">Paladin</a>',
				"action" : 'paladin'
			},
			{
				"title" : "Paths of Power",
				"action" : "NODE"
			},
			{
				"title" : '<a href="artificer.html">Artificer</a>',
				"action" : "artificer"
			},
			{
				"title" : '<a href="sorcerer.html">Sorcerer</a>',
				"action" : "sorcerer"
			},
			{
				"title" : '<a href="wardscribe.html">Wardscribe</a>',
				"action" : "wardscribe"
			},
			{
				"title" : '<a href="wizard.html">Wizard</a>',
				"action" : "wizard"
			},
			{
				"title" : "Paths of Trickery",
				"action" : "NODE"
			},
			{
				"title" : '<a href="assassin.html">Assassin</a>',
				"action" : "assassin"
			},
			{
				"title" : '<a href="scout.html">Scout</a>',
				"action" : "scout"
			},
			{
				"title" : '<a href="thief.html">Thief</a>',
				"action" : "thief"
			},
			{
				"title" : '<a href="warlock.html">Warlock</a>',
				"action" : "warlock"
			},
			{
				"title" : "Paths of War",
				"action" : "NODE"
			},
			{
				"title" : '<a href="berserker.html">Berserker</a>',
				"action" : "berserker"
			},
			{
				"title" : '<a href="fighter.html">Fighter</a>',
				"action" : "fighter"
			},
			{
				"title" : '<a href="ranger.html">Ranger</a>',
				"action" : "ranger"
			},
			{
				"title" : '<a href="spellbinder.html">Spellbinder</a>',
				"action" : "spellbinder"
			}
		]
	},
	{
		"name" : "mpaths",
		"content" : [
			{
				"title" : "<a href='../index.html'>&lt==</a>",
				"action" : "home"
			},
			{
				"title" : '<a href="overview.html">Overview</a>',
				"action" : "overview"
			},
			{
				"title" : "Magic Master Paths",
				"action" : "NODE"
			},
			{
				"title" : '<a href="mA.html">A - B</a>',
				"action" : "mA"
			},
			{
				"title" : '<a href="mC.html">C - E</a>',
				"action" : "mC"
			},
			{
				"title" : '<a href="mG.html">G - M</a>',
				"action" : "mG"
			},
			{
				"title" : '<a href="mN.html">N - S</a>',
				"action" : "mN"
			},
			{
				"title" : '<a href="mT.html">T - W</a>',
				"action" : "mT"
			},
			{
				"title" : "Skill Master Paths",
				"action" : "NODE"
			},
			{
				"title" : '<a href="sA.html">A - C</a>',
				"action" : "sA"
			},
			{
				"title" : '<a href="sD.html">D</a>',
				"action" : "sD"
			},
			{
				"title" : '<a href="sE.html">E - I</a>',
				"action" : "sE"
			},
			{
				"title" : '<a href="sJ.html">J - R</a>',
				"action" : "sJ"
			},
			{
				"title" : '<a href="sS.html">S - Z</a>',
				"action" : "sS"
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
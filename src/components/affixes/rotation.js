

//takes an affix name, and returns the corresponding object in the affixlibrary
function affixNameToObject(str) {
	let a = affixlibrary.filter((item) => str === item.name)
	return a[0]
}
//takes an array, designed  for an individual week, and returns an array containing the three affix objects for that week.
function affixWeekToObjectArray(arr) {
	let newarr = [];
	for (let i = 0; i < arr.length; i++) {
		newarr.push(affixNameToObject(arr[i]))
	}
	return newarr;
}

//returns a final array with each week of objects stored in its own array.
function rotationBuilder() {
	let final = []
	for (let i = 0; i < rotationnames.length; i++) {
		final.push(affixWeekToObjectArray(rotationnames[i]))
	}
	return final;
}
//This is the rotation for the season
const rotationnames = [
	["Fortified", "Incorporeal", "Sanguine"],
	["Tyrannical", "Entangling", "Bursting"],
	["Fortified", "Volcanic", "Spiteful"],
	["Tyrannical", "Storming", "Raging"],
	["Fortified", "Entangling", "Bolstering"],
	["Tyrannical", "Incorporeal", "Spiteful"],
	["Fortified", "Afflicted", "Raging"],
	["Tyrannical", "Volcanic", "Sanguine"],
	["Fortified", "Storming", "Bursting"],
	["Tyrannical", "Afflicted", "Bolstering"]
]



//This is my own data structure for a library of affixes, with the name, id, and description
const affixlibrary = [
	{
		name: 'Tyrannical',
		id: 9,
		description: "Bosses have 30% more health. Bosses and their minions inflict up to 15% increased damage."
	},
	{
		name: 'Fortified',
		id: 10,
		description: "Non-boss enemies have 20% more health and inflict up to 30% increased damage."
	},
	{
		name: 'Raging',
		id: 6,
		description: "Non-boss enemies enrage at 30% health remaining, temporarily granting immunity to crowd control effects."
	},
	{
		name: 'Storming',
		id: 124,
		description: "While in combat, enemies periodically summon damaging whirlwinds."
	},
	{
		name: 'Entangling',
		id: 134,
		description: "While in combat, entangling vines periodically appear and snare players."
	},
	{
		name: 'Bolstering',
		id: 7,
		description: "When any non-boss enemy dies, its death cry empowers nearby allies, temporarily increasing their damage by 20%."
	},
	{
		name: 'Incorporeal',
		id: 136,
		description: "While in combat, incorporeal beings periodically appear and attempt to weaken players."
	},
	{
		name: 'Spiteful',
		id: 123,
		description: "Fiends rise from the corpses of non-boss enemies and pursue random players."
	},
	{
		name: 'Bursting',
		id: 11,
		description: "When slain, non-boss enemies explode, causing all players to suffer damage over 4 sec. This effect stacks."
	},
	{
		name: 'Volcanic',
		id: 3,
		description: "While in combat, enemies periodically cause gouts of flame to erupt beneath the feet of distant players."
	},
	{
		name: 'Sanguine',
		id: 8,
		description: "When slain, non-boss enemies leave behind a lingering pool of ichor that heals their allies and damages players."
	},
	{
		name: 'Afflicted',
		id: 135,
		description: "While in combat, afflicted souls periodically appear and seek the aid of players."
	}
]

//this is an array of arrays, each being a week in the current mythic plus rotation, starting with week 1 at position 0
export const rotation = [
  [
    {
      name: 'Fortified',
      id: 10,
      description: 'Non-boss enemies have 20% more health and inflict up to 30% increased damage.'
    },
    {
      name: 'Incorporeal',
      id: 136,
      description: 'While in combat, incorporeal beings periodically appear and attempt to weaken players.'
    },
    {
      name: 'Sanguine',
      id: 8,
      description: 'When slain, non-boss enemies leave behind a lingering pool of ichor that heals their allies and damages players.'
    }
  ],
  [
    {
      name: 'Tyrannical',
      id: 9,
      description: 'Bosses have 30% more health. Bosses and their minions inflict up to 15% increased damage.'
    },
    {
      name: 'Entangling',
      id: 134,
      description: 'While in combat, entangling vines periodically appear and snare players.'
    },
    {
      name: 'Bursting',
      id: 11,
      description: 'When slain, non-boss enemies explode, causing all players to suffer damage over 4 sec. This effect stacks.'
    }
  ],
  [
    {
      name: 'Fortified',
      id: 10,
      description: 'Non-boss enemies have 20% more health and inflict up to 30% increased damage.'
    },
    {
      name: 'Volcanic',
      id: 3,
      description: 'While in combat, enemies periodically cause gouts of flame to erupt beneath the feet of distant players.'
    },
    {
      name: 'Spiteful',
      id: 123,
      description: 'Fiends rise from the corpses of non-boss enemies and pursue random players.'
    }
  ],
  [
    {
      name: 'Tyrannical',
      id: 9,
      description: 'Bosses have 30% more health. Bosses and their minions inflict up to 15% increased damage.'
    },
    {
      name: 'Storming',
      id: 124,
      description: 'While in combat, enemies periodically summon damaging whirlwinds.'
    },
    {
      name: 'Raging',
      id: 6,
      description: 'Non-boss enemies enrage at 30% health remaining, temporarily granting immunity to crowd control effects.'
    }
  ],
  [
    {
      name: 'Fortified',
      id: 10,
      description: 'Non-boss enemies have 20% more health and inflict up to 30% increased damage.'
    },
    {
      name: 'Entangling',
      id: 134,
      description: 'While in combat, entangling vines periodically appear and snare players.'
    },
    {
      name: 'Bolstering',
      id: 7,
      description: 'When any non-boss enemy dies, its death cry empowers nearby allies, temporarily increasing their damage by 20%.'
    }
  ],
  [
    {
      name: 'Tyrannical',
      id: 9,
      description: 'Bosses have 30% more health. Bosses and their minions inflict up to 15% increased damage.'
    },
    {
      name: 'Incorporeal',
      id: 136,
      description: 'While in combat, incorporeal beings periodically appear and attempt to weaken players.'
    },
    {
      name: 'Spiteful',
      id: 123,
      description: 'Fiends rise from the corpses of non-boss enemies and pursue random players.'
    }
  ],
  [
    {
      name: 'Fortified',
      id: 10,
      description: 'Non-boss enemies have 20% more health and inflict up to 30% increased damage.'
    },
    {
      name: 'Afflicted',
      id: 135,
      description: 'While in combat, afflicted souls periodically appear and seek the aid of players.'
    },
    {
      name: 'Raging',
      id: 6,
      description: 'Non-boss enemies enrage at 30% health remaining, temporarily granting immunity to crowd control effects.'
    }
  ],
  [
    {
      name: 'Tyrannical',
      id: 9,
      description: 'Bosses have 30% more health. Bosses and their minions inflict up to 15% increased damage.'
    },
    {
      name: 'Volcanic',
      id: 3,
      description: 'While in combat, enemies periodically cause gouts of flame to erupt beneath the feet of distant players.'
    },
    {
      name: 'Sanguine',
      id: 8,
      description: 'When slain, non-boss enemies leave behind a lingering pool of ichor that heals their allies and damages players.'
    }
  ],
  [
    {
      name: 'Fortified',
      id: 10,
      description: 'Non-boss enemies have 20% more health and inflict up to 30% increased damage.'
    },
    {
      name: 'Storming',
      id: 124,
      description: 'While in combat, enemies periodically summon damaging whirlwinds.'
    },
    {
      name: 'Bursting',
      id: 11,
      description: 'When slain, non-boss enemies explode, causing all players to suffer damage over 4 sec. This effect stacks.'
    }
  ],
  [
    {
      name: 'Tyrannical',
      id: 9,
      description: 'Bosses have 30% more health. Bosses and their minions inflict up to 15% increased damage.'
    },
    {
      name: 'Afflicted',
      id: 135,
      description: 'While in combat, afflicted souls periodically appear and seek the aid of players.'
    },
    {
      name: 'Bolstering',
      id: 7,
      description: 'When any non-boss enemy dies, its death cry empowers nearby allies, temporarily increasing their damage by 20%.'
    }
  ]
]




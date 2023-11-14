import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { CharacterOverview } from 'components/characterview/characterview';
import './guildroster.css';
import { token } from 'library/oauth';


export function GuildRosterSearch() {
	const [bartext, setBarText] = useState();
	const [list, setList] = useState([]);
	const [characterList, setCharacterList] = useState([]);


	const [displayCharacter, setDisplayCharacter] = useState();
	const [characterRealm, setCharacterRealm] = useState();
	const [characterLevel, setCharacterLevel] = useState();

	let nameslist = useMemo(() => {
		let nameslist = [];
		list.map((item, key) => {
			nameslist = [...nameslist, { name: item.character.name, level: item.character.level, realm: item.character.realm.slug }]
		});
		return nameslist;
	}, [list]);

	async function fetchData() {
		const response = await fetch(`https://us.api.blizzard.com/data/wow/guild/chogall/inebriated-raiding/roster?namespace=profile-us&locale=en_US&access_token=${token}`);
		const fetchedData = await response.json();
		setList(fetchedData.members);
	};

	function handleChange(e) {
		setBarText(e.target.value.toLowerCase());
	};

	function handleSearch(array) {
		return array.filter((item, key) => item.name.toLowerCase().includes(bartext));
	};

	useEffect(() => {
		fetchData();
	}, [displayCharacter]);

	return (
		<>
			<div className="wrapper">
				<div className='searchblock'>
					<div>
						Character Name:
					</div>
					<input className="namesearch" onChange={handleChange} />
					{
						bartext !== "" &&
						<div className="nameslist">{handleSearch(nameslist).map((item, key) => {
							return (<div className="name" onClick={() => {
								{ setDisplayCharacter(item.name.toLowerCase()) };
								{ setCharacterRealm(item.realm) };
								{ setCharacterLevel(item.level) };
								{ setBarText("") }
							}}>
								{item.name}
							</div>);
						})
						}</div>
					}</div>
				{
					displayCharacter !== undefined &&
					<div className="characterview">
							<CharacterOverview characterRealm={characterRealm} characterName={displayCharacter} characterLevel={characterLevel} />
					</div>
				}
			</div >
			{/*
				<pre>{JSON.stringify(list, null, 2)}</pre>

				<pre>{JSON.stringify(nameslist, null, 2)}</pre>
			*/}
		</>
	)
}



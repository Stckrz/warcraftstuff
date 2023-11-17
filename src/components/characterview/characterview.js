import React from 'react';
import { useState, useEffect } from 'react';
import './characterview.css';
import { token } from 'library/oauth';
import { Namespace } from 'components/characterview/namespace/namespace';
import { CharacterSummary } from 'components/characterview/summary/summary';
import { MythicRun } from 'components/mythicrun/recentruns/recentruns';


export function CharacterOverview(props) {
	const { characterName, characterRealm, characterLevel } = props;
	const [data, setData] = useState();
	const [tabsarray, setTabsArray] = useState([
		{ name: "overview", isSelected: true }, 
		{ name: "mythic plus", isSelected: false }, 
		{ name: "raid", isSelected: false }, 
		{ name: "arena", isSelected: false }])

	function handleShowClick(str) {
		setTabsArray(
			tabsarray.map((item) => {
				if (item.name === str) {
					return { ...item, isSelected: true };
				} else {
					return { ...item, isSelected: false };
				}
			})
		)
	}


	function isSelectedHandler(){
		return tabsarray.find(item => item.isSelected === true)

	}

	async function fetchData() {
		const response = await fetch(`https://us.api.blizzard.com/profile/wow/character/${characterRealm}/${characterName}?namespace=profile-us&locale=en_US&access_token=${token}`)
		const fetchedData = await response.json();
		setData(fetchedData);
	}

	useEffect(() => {
		fetchData();
	}, [characterName, characterRealm]);
	if (!data) return (null);

	return (
		<>
			<div className="characterWrap">
				<div className="playercard">
					{data.race !== undefined ?
						<Namespace
							characterName={characterName}
							race={data.race.name}
							realm={characterRealm}
							title={data.active_title?.display_string}
							characterClass={data.character_class.name}
							level={characterLevel}
							last_login={data.last_login_timestamp}
							item_level={data.equipped_item_level}
						/> : <div>Character is so unimportant, it's not up-to-date in Blizzard's databas</div>
					}

				</div>
				<div className="player-tab-container">
					{
						tabsarray.map((item) => {

							return (
							<>
								<div className="character-tab" onClick = {()=>{
								{handleShowClick(item.name)}
								}}>
								{item.name}
								</div>
								</>
							)
						})
					}

				</div>
				{data.level === 70 ?
					
					<>
					{isSelectedHandler().name === "overview" &&
					<CharacterSummary characterName={characterName} characterRealm= {characterRealm} />}

					{isSelectedHandler().name === "mythic plus" &&
					<MythicRun characterName={characterName}  />}

					{isSelectedHandler().name === "raid" &&
					<CharacterSummary characterName={characterName} characterRealm= {characterRealm} />}

					{isSelectedHandler().name === "arena" &&
					<CharacterSummary characterName={characterName} characterRealm= {characterRealm} />}

					</>
					: <div>{'Character not max level so i dont give a shit about them'}</div>}
			</div>
			{/* <pre> */}
			{/* 	{JSON.stringify(data, null, 2)} */}
			{/* </pre> */}
		</>
	);

}


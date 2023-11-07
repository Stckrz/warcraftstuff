import React from 'react';
import { useState, useEffect } from 'react';
import './characterview.css';
import { token } from 'library/oauth';
import { MythicRun, MythicRunSummary } from 'components/mythicrun/mythicrun';
import { CharacterRaidProgress } from 'components/playerraidprogress/playerraidprogress';
import { ArenaSummary } from 'components/pvp/pvpsummary/pvpsummary';
import { Namespace } from 'components/characterview/namespace/namespace';


export function CharacterOverview(props) {
	const { characterName, characterRealm, characterLevel } = props;
	const [data, setData] = useState();

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
							title={data.active_title?.name} 
							characterClass={data.character_class.name}
							level={characterLevel}
						/>:<div>Character is so unimportant, it's not up-to-date in Blizzard's databas</div>
					}

				</div>
				{data.level === 70 ?
					<div className='content'>
						<div className="raid">
							<p>raid progress</p>
							<CharacterRaidProgress characterName={characterName} characterRealm={characterRealm} />
						</div>
						{/* <div>recent m+ runs<MythicRun characterName={characterName} /></div> */}
						<div className="mythicplus">
							<p>mythic plus</p>
							<MythicRunSummary characterRealm={characterRealm} characterName={characterName} />
						</div>
						<div className="arena">
							<p>arena</p>
							<ArenaSummary characterRealm={characterRealm} characterName={characterName} />
						</div>
					</div>
					: <div>{'Character not max level so i dont give a shit about them'}</div>}
			</div>
			{/* <pre> */}
			{/* 	{JSON.stringify(data, null, 2)} */}
			{/* </pre> */}
		</>
	);

}


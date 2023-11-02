import React from 'react';
import { useState, useEffect } from 'react';
import './playerraidprogress.css';
import { token } from '../../library/oauth'


export function CharacterRaidProgress(props) {
	const { characterName, characterRealm } = props;
	const [data, setData] = useState();


	async function fetchData() {
		const response = await fetch(`https://us.api.blizzard.com/profile/wow/character/${characterRealm}/${characterName}/encounters/raids?namespace=profile-us&locale=en_US&access_token=${token}`)
		const fetchedData = await response.json();
		setData(fetchedData.expansions.filter((item) => { return item.expansion.name === "Current Season" }))

	}

	useEffect(() => {
		fetchData()
	}, [characterName])
	if (!data) return (null);


	return (

		<>
			{data[0] !== undefined ?
				<div className="raidwrapper">
					<div className="raidname">{data[0].instances[0].instance.name}</div>
					<div className="difficultywrapper">
						{data[0].instances[0].modes.map((item) => {
							{
								return (
									<div className="difficulty">{item.difficulty.name}<div>{`${item.progress.completed_count}/${item.progress.total_count}`}</div></div>
								)
							}
						})}
					</div>

				</div>
			:<div className="raidwrapper">No raid progress this season</div>}
		</>

	)

}




import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import './playerraidprogress.css';
import { token } from '../../library/oauth'

const defaultModeArray = [
	{ difficulty: 'Raid Finder', score: '-', total: '-' },
	{ difficulty: 'Normal', score: '-', total: '-' },
	{ difficulty: 'Heroic', score: '-', total: '-' },
	{ difficulty: 'Mythic', score: '-', total: '-' }
]

export function CharacterRaidProgress(props) {
	const { characterName, characterRealm } = props;
	const [data, setData] = useState();
	const [modelist, setModeList] = useState(defaultModeArray)


	useMemo(() => {
		if (!data?.instances?.length) return null;
		let listCopy = structuredClone(defaultModeArray)
		let apilistCopy = data?.instances[0].modes ?? []

		for (let bitem of apilistCopy) {
			listCopy.find(item => item.difficulty === bitem.difficulty.name).score = bitem.progress.completed_count
			listCopy.find(item => item.difficulty === bitem.difficulty.name).total = bitem.progress.total_count
		}
		setModeList(listCopy)
	}, [data]);


	async function fetchData() {
		const response = await fetch(`https://us.api.blizzard.com/profile/wow/character/${characterRealm}/${characterName}/encounters/raids?namespace=profile-us&locale=en_US&access_token=${token}`)
		const fetchedData = await response.json();
		setData(
			fetchedData.expansions?.find(
				(item) => { return item.expansion.name === "Current Season" }
			) ?? []
		)
	}


	useEffect(() => {
		fetchData()
	}, [characterName])

	if (!data) return (null);

	return (
		<>
			{data.expansion !== undefined ?
			<div className="raidwrapper">
				<div className="raidname">
					{data.instances[0].instance.name}
				</div>
				<div className="difficultywrapper">
					{
						modelist.map((item) => {
							return (
								<div className="difficulty">
									<div>{item.difficulty}</div>
									<div>{item.score}/{item.total}</div>
								</div>
							)
						})
					}
				</div>
			</div>
		:<div></div>	}	
		</>
	)
}




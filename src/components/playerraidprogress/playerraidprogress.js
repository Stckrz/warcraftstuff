import React from 'react';
import { useState, useEffect } from 'react';



export function CharacterRaidProgress(props) {
	const { characterName, characterRealm } = props;
	const [data, setData] = useState();


	async function fetchData() {
		const response = await fetch(`https://us.api.blizzard.com/profile/wow/character/${characterRealm}/${characterName}/encounters/raids?namespace=profile-us&locale=en_US&access_token=USVI4TFLQ61F2vXQqyg0QYHGXe29FIZory`)
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
				<>
					<div>{data[0].instances[0].instance.name}</div>
					<div>
						{data[0].instances[0].modes.map((item) => {
							{
								return (
									<div>{`${item.difficulty.name} ${item.progress.completed_count}/${item.progress.total_count}`}</div>
								)
							}
						})}
					</div>

				</>
			:<div>No raid progress this season</div>}
		</>

	)

}




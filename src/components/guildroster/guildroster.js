import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { CharacterPortrait } from './../characterview/characterview';
import './guildroster.css'

export function GuildRosterList() {

	const [list, setList] = useState([]);


	const sortedList = useMemo(() => {
		const sortedList = [...list];
		sortedList.sort((a, b) => { return a.character.level - b.character.level })
		return sortedList
	}, [list])


	async function fetchData() {
		const response = await fetch(`https://us.api.blizzard.com/data/wow/guild/chogall/inebriated-raiding/roster?namespace=profile-us&locale=en_US&access_token=USVI4TFLQ61F2vXQqyg0QYHGXe29FIZory`)
		const fetchedData = await response.json();
		setList(fetchedData.members)

	}

	useEffect(() => {
		fetchData()
	}, [])




	return (
		<>
			{/*
			<div>{list[1].character.name}</div>
					
					*/}
			{
				sortedList.reverse().map((item) => {
					{
						return (
							<>
								<div className="character">{`${item.character.level}  ${item.character.name}`}</div>
							</>
	)
}
				})}

< pre > {JSON.stringify(list, null, 2)}</pre >
		</>
	)


}

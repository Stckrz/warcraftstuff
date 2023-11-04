import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import './playerraidprogress.css';
import { token } from '../../library/oauth'


export function CharacterRaidProgress(props) {
	const { characterName, characterRealm } = props;
	const [data, setData] = useState();
	const [modelist, setModeList] = useState([
		{difficulty: 'raid finder', score: '-'},
		{difficulty: 'normal', score: '-'},
		{difficulty: 'heroic', score: '-'},
		{difficulty: 'mythic', score: '-'}
	])

// b.map((bitem) => {
// a.find(item => item.difficulty === bitem.difficulty).score = bitem.score
// })



	
	// function handleEdit() {
	// 	setList(
	// 		list.map((task)=>{
	// 			if (task.id === item.id){
	// 				return {...task, taskName: text};
	// 			}else{
	// 				return task;
	// 			}
	// 			})
	// 	)
	//
	// }

	// const modes = useMemo(() => {
	// 	if(!data) return null;
	// 	return data[0]?.instances[0]?.modes?.map((mode) => {
	// 		return {
	// 			difficulty: mode.difficulty.name,
	// 			completed: mode.progress.completed_count,
	// 			total: mode.progress.total_count,
	// 		}
	// 	});
	// }, [data]);

	const modes = useMemo(() => {
		if(!data) return null;
		let listCopy = [...modelist]
		return data[0]?.instances[0]?.modes?.map((mode) => {
			return {
				difficulty: mode.difficulty.name,
				completed: mode.progress.completed_count,
				total: mode.progress.total_count,
			}
		});
	}, [data]);


	async function fetchData() {
		const response = await fetch(`https://us.api.blizzard.com/profile/wow/character/${characterRealm}/${characterName}/encounters/raids?namespace=profile-us&locale=en_US&access_token=${token}`)
		const fetchedData = await response.json();
		setData(
			fetchedData.expansions?.filter(
				(item) => { return item.expansion.name === "Current Season" }
			) ?? []
		)
		console.log(fetchedData.expansions?.filter((item) => { return item.expansion.name === "Current Season" }))
	}



	useEffect(() => {
		fetchData()
	}, [characterName])
	if (!data) return (null);

	return (

		<>
			{data[0] !== undefined ?
				<div className="raidwrapper">
					<div className="raidname">
						{data[0].instances[0].instance.name}
					</div>
					<div className="difficultywrapper">
						{
							modes?.map((item) => {
								/*{ setModes([...modes, { difficulty: item.difficulty.name, completed: item.progress.completed_count, total: item.progress.total_count }]) }*/

								return (
									<div className="difficulty">
										{item.difficulty}
										<div>
											{item.completed}/{item.total}
										</div>
									</div>
								)
							})
						}
					</div>

				</div>
				: <div className="raidwrapper">No raid progress this season</div>
			}
		</>

	)

}




import React from 'react';
import { useState, useEffect } from 'react';
import './characterview.css';
import { MythicRun } from './../mythicrun/mythicrun';


export function CharacterOverview(props) {
	const { characterName, characterRealm } = props;
	const [data, setData] = useState();

	async function fetchData() {
		const response = await fetch(`https://raider.io/api/v1/characters/profile?region=us&realm=${characterRealm}&name=${characterName}`)
		const fetchedData = await response.json();
		setData(fetchedData)

	}

	useEffect(() => {
		fetchData()
	}, [characterName, characterRealm])
	if (!data) return (null);

	return (
		<>
			<div className="characterWrap">
				<div className="playercard">
					<div className="thumbnail"><img src={data.thumbnail_url} /></div>
					<div className="namespace">
						<p>{data.name}</p>
						<p>{`${data.race}   ${data.class}`}</p>
					</div>
				</div>
				<div className='content'>
					<div>recent m+ runs<MythicRun characterName={characterName} /></div>
				</div>
			</div>
			<pre>
				{/*{JSON.stringify(data, null, 2)}*/}
			</pre>
		</>
	)

}




// export function CharacterPortrait(props) {
// 	const { characterName } = props;
// 	const [data, setData] = useState();
//
// 	async function fetchData() {
// 		const response = await fetch(`https://raider.io/api/v1/characters/profile?region=us&realm=chogall&name=${characterName}`)
// 		const fetchedData = await response.json();
// 		setData(fetchedData)
//
// 	}
//
// 	useEffect(() => {
// 		if (characterName) fetchData();
//
// 	}, [characterName])
//
//
// 	if (!data) return (null);
//
// 	return (
// 		<div className="thumbnail"><img src={data.thumbnail_url} /></div>
// 	)
//
// }

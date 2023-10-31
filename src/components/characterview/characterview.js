import React from 'react';
import { useState, useEffect } from 'react';
import './characterview.css';
import { MythicRun } from './../mythicrun/mythicrun';
export function CharacterOverview(props) {
	const { characterName } = props;
	const [data, setData] = useState();
	const [toggle, setToggle] = useState(false);

	async function fetchData() {
		const response = await fetch(`https://raider.io/api/v1/characters/profile?region=us&realm=chogall&name=${characterName}`)
		const fetchedData = await response.json();
		setData(fetchedData)

	}

	useEffect(() => {
		fetchData()

	}, [])
	if (!data) return (null);

	return (
		<>
			<div className="characterWrap">
				<div className="playercard">
					<div className="thumbnail"><img src={data.thumbnail_url} /></div>
					<div className="namespace">
						<p>{data.name}</p>
						<p>{data.race}{data.class}{}</p>
					</div>
				</div>
				<div onClick={() => { setToggle(!toggle) }}> ▼recent runs</div>
				{toggle && <div><MythicRun characterName={characterName} /></div>}
			</div>
			<pre>
				{/*{JSON.stringify(data, null, 2)}*/}
			</pre>
		</>
	)

}

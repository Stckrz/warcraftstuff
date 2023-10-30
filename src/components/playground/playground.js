import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
const apiurl = 'https://raider.io/api/v1/mythic-plus/runs?season=season-7.3.0&region=world&dungeon=all&page=0'

export function Leaderboard() {
	const [data, setData] = useState([]);
	const [modifiers, setModifiers] = useState()

	useEffect(() => {
		axios.get(apiurl).then((response) => {
			let stuffs = response.data.rankings[0];

			setData(stuffs);

		});


	}, []);

	if (!data) return (null);
	let dungeon_info = data.run.dungeon;
	const dungeon_level = data.run.mythic_level;
	const keystone_time_ms = data.run.keystone_time_ms;
	class Dungeon {
		constructor(dungeonName, level, time_ms) {
			this.dungeonName = dungeonName;
			this.level = level;
			this.time_ms = time_ms;
		}
	}

	const dungeon = new Dungeon(dungeon_info, dungeon_level, keystone_time_ms)

	return (

		<div>
			<pre>
				{/*		{JSON.stringify(data.run, null, 2)}*/}
			</pre>
		</div>
	)
}

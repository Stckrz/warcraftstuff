import React from 'react';
import { useState, useEffect } from 'react';
import { SingleRun } from 'components/mythicrun/singlerun';
import './recentruns.css';


export function MythicRun(props) {
	const { characterName } = props;
	const [rundata, setRunData] = useState();
//	const [toggle, setToggle] = useState(false);

	async function fetchData() {
		const response = await fetch(`https://raider.io/api/v1/characters/profile?region=us&realm=chogall&name=${characterName}&fields=mythic_plus_weekly_highest_level_runs`);
		const fetchedData = await response.json();
		setRunData(fetchedData.mythic_plus_weekly_highest_level_runs);
	}

	// function getIdHandler(url) {
	// 	return url.match(/.+\/(\d+)-/)[1]
	// }

	useEffect(() => {
		fetchData();
	}, [characterName])
	if (!rundata) return (null);

	return (
		rundata !== undefined ?
			<div className="mrunwrap">
				{rundata.map((item) => {
					{
						return (
							<SingleRun
								dungeon={item.dungeon}
								completed_at={item.completed_at}
								level={item.mythic_level}
								affixes={item.affixes}
								completed={item.clear_time_ms < item.par_time_ms ? "timed": "untimed"}
							/>
						)
					}
				})}
			</div>
			: <div>butts</div>
	)
}

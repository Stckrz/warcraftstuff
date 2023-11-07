import React from 'react';
import { useState, useEffect } from 'react';
import './mythicrun.css';
import { token } from 'library/oauth.js';
import { MythicIcon } from 'components/affixes/affixes';
import { SingleRun } from 'components/mythicrun/singlerun';
import moment from 'moment';

export function MythicRun(props) {
	const { characterName } = props;
	const [rundata, setRunData] = useState();
	const [toggle, setToggle] = useState(false);

	async function fetchData() {
		const response = await fetch(`https://raider.io/api/v1/characters/profile?region=us&realm=chogall&name=${characterName}&fields=mythic_plus_recent_runs`);
		const fetchedData = await response.json();
		setRunData(fetchedData.mythic_plus_recent_runs);
	}

	// function getIdHandler(url) {
	// 	return url.match(/.+\/(\d+)-/)[1]
	// }

	useEffect(() => {
		fetchData();
		console.log(rundata);
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
							/>
						)
					}
				})}
			</div>
			: <div>butts</div>
	)
}


export function MythicRunSummary(props) {
	const { characterName, characterRealm } = props;
	const [rundata, setRunData] = useState();
	const [seasonScores, setSeasonScores] = useState();
	const [bestRuns, setBestRuns] = useState();

	function lastTuesday() {

	let prevTuesday = new Date();
	return new Date(prevTuesday.setDate(prevTuesday.getDate() - (prevTuesday.getDay() + 5) % 7))
	}

	async function fetchData() {
		const response = await fetch(`https://raider.io/api/v1/characters/profile?region=us&realm=chogall&name=${characterName}&fields=mythic_plus_scores_by_season%3Acurrent%2Cmythic_plus_recent_runs`);
		const fetchedData = await response.json();
		if (response.status === 200) {
			setRunData(fetchedData?.mythic_plus_recent_runs);
			setSeasonScores(fetchedData?.mythic_plus_scores_by_season);
		} else {
			setRunData([])
			setSeasonScores([])
		}
	}

	async function fetchBestRuns() {
		const response = await fetch(`https://us.api.blizzard.com/profile/wow/character/${characterRealm}/${characterName}/mythic-keystone-profile/season/10?namespace=profile-us&locale=en_US&access_token=${token}`);
		const fetchedData = await response.json();
		if (response.status === 200) {
			setBestRuns(fetchedData.best_runs);
		} else {
			setBestRuns([])
		}
	}

	function dateCheckHandler() {
		let a = 0
		rundata.filter((item) => {
			if (new Date(item.completed_at).getTime() > lastTuesday().getTime()){
			a += 1;}
		})
		return a
	}

	useEffect(() => {
		fetchData();
		fetchBestRuns();
	}, [characterName]);

	if (!rundata) return (null);
	if (!bestRuns) return (null);

	return (
		<div className="mythicwrapper">
			{seasonScores[0] !== undefined ?
				<div className="headwrap">
					rating:
					<div style={{ color: seasonScores[0].segments.all.color }}>
						{seasonScores[0].scores.all}
					</div>

					<div>{`dungeons this week: ${dateCheckHandler()}`}</div>
				</div>
				: <div>no data found</div>}


			{bestRuns[0] !== undefined ?
				<div>
					Top run this season:
					<SingleRun
						dungeon={bestRuns[0].dungeon.name}
						completed_at={bestRuns[0].completed_timestamp}
						level={bestRuns[0].keystone_level}
						affixes={bestRuns[0].keystone_affixes}
					/>
				</div> : <div>no runs found this season</div>}
			{/* <pre>{JSON.stringify(bestRuns, null, 2)}</pre> */}
			{/* <pre>{JSON.stringify(seasonScores, null, 2)}</pre> */}
			{/* <pre>{JSON.stringify(rundata, null, 2)}</pre> */}
		</div>
	)
}

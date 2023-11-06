import React from 'react';
import { useState, useEffect } from 'react';
import './mythicrun.css';
import { token } from './../../library/oauth.js';
import { MythicIcon } from './../affixes/affixes';
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
	}, [])
	if (!rundata) return (null);


	return (
		<div className="mrunwrap">
			{rundata.map((item) => {
				{
					return (
						<div className='mythicwrapper' onClick={() => { setToggle(!toggle) }}>
							<div className="dungeonbasic">
								{item.dungeon}
								<br />
								{item.mythic_level}<br />{new Date(item.completed_at).toLocaleDateString()}
								<div className="mythiciconwrap">
									{item.affixes.map((affix) => {
										{
											return (
												<a href={affix.wowhead_url} target={"_blank"}>
													<div className="mythicicon">
														<MythicIcon id={affix.id} />
													</div>
												</a>
											)
										}
									})}
								</div>
							</div>
						</div>
					)
				}
			})}
		</div>
	)
}


export function MythicRunSummary(props) {
	const { characterName, characterRealm } = props;
	const [rundata, setRunData] = useState();
	const [seasonScores, setSeasonScores] = useState();
	const [bestRuns, setBestRuns] = useState();

	function lastTuesday() {
		return new Date(moment().day(2)).toLocaleDateString();
	}

	async function fetchData() {
		const response = await fetch(`https://raider.io/api/v1/characters/profile?region=us&realm=chogall&name=${characterName}&fields=mythic_plus_scores_by_season%3Acurrent%2Cmythic_plus_recent_runs`);
		const fetchedData = await response.json();
		setRunData(fetchedData.mythic_plus_recent_runs);
		setSeasonScores(fetchedData.mythic_plus_scores_by_season);

	}

	async function fetchBestRuns() {
		const response = await fetch(`https://us.api.blizzard.com/profile/wow/character/${characterRealm}/${characterName}/mythic-keystone-profile/season/10?namespace=profile-us&locale=en_US&access_token=${token}`);
		const fetchedData = await response.json();
		setBestRuns(fetchedData);

	}

	function dateCheckHandler() {
		let a = 0
		rundata.filter((item) => {
			if (new Date(item.completed_at).toLocaleDateString < lastTuesday());
				a += 1;
		})
		return a
	}

	useEffect(() => {
		fetchData();
		fetchBestRuns();
	}, [characterName]);

	if (!rundata) return (null);

	return (
		<div className="mythicwrapper">{lastTuesday()}<br /><div>{dateCheckHandler()}
			<div style={{ color: seasonScores[0].segments.all.color }}>
				{seasonScores[0].scores.all}
			</div>

			<div className="dungeonbasic">
				{bestRuns.best_runs[0].dungeon.name}
				<br />
				{bestRuns.best_runs[0].keystone_level}<br />{new Date(bestRuns.best_runs[0].completed_timestamp).toLocaleDateString()}<br />
				<div className="mythiciconwrap">

					{bestRuns.best_runs[0].keystone_affixes.map((affix) => {
						{
							return (
								<div className="mythicicon">
									<MythicIcon id={affix.id} />
								</div>
							)
						}
					})}

				</div>
			</div>

		</div>
			{/*
				<pre>{JSON.stringify(bestRuns, null, 2)}</pre>
*/}
		</div>);

}

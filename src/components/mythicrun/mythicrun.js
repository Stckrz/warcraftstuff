import React from 'react';
import { useState, useEffect } from 'react';
import './mythicrun.css';
import { token } from 'library/oauth.js';
import { SingleRun } from 'components/mythicrun/singlerun';
import { VaultStats } from 'components/mythicrun/vaultstats/vaultstats';


export function MythicRunSummary(props) {
	const { characterName, characterRealm } = props;
	const [rundata, setRunData] = useState();
	const [seasonScores, setSeasonScores] = useState();
	const [bestRuns, setBestRuns] = useState();


	async function fetchData() {
		const response = await fetch(`https://raider.io/api/v1/characters/profile?region=us&realm=chogall&name=${characterName}&fields=mythic_plus_scores_by_season%3Acurrent%2Cmythic_plus_weekly_highest_level_runs`);
		const fetchedData = await response.json();
		if (response.status === 200) {
			setRunData(fetchedData?.mythic_plus_weekly_highest_level_runs);
			setSeasonScores(fetchedData?.mythic_plus_scores_by_season);
		} else {
			setRunData([])
			setSeasonScores([])
		}
	};

	async function fetchBestRuns() {
		const response = await fetch(`https://us.api.blizzard.com/profile/wow/character/${characterRealm}/${characterName}/mythic-keystone-profile/season/11?namespace=profile-us&locale=en_US&access_token=${token}`);
		const fetchedData = await response.json();
		if (response.status === 200) {
			setBestRuns(fetchedData.best_runs);
		} else {
			setBestRuns([])
		}
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
					<div className="ratingfield">
						<div>rating:</div>
						<div style={{ color: seasonScores[0].segments.all.color }}>
							{seasonScores[0].scores.all}
						</div>
					</div>
					<div className="vault-stats"><VaultStats rundata = {rundata} /></div>

					{/* <div>{`dungeons this week: ${rundata.length}`}</div> */}
				</div>
				: <div>no data found</div>}


			{bestRuns[0] !== undefined ?
				<div className="singlerunwrap">
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


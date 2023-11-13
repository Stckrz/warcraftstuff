import React from 'react';
import { useState, useEffect } from 'react';
import './affixes.css';
import { rotation } from './rotation';
import { WeeklyAffixes } from './weeklyaffix/weeklyaffix';

export function Affixes() {
	const [affixes, setAffixes] = useState();
	const [nextWeekAffixes, setNextWeekAffixes] = useState();

	const startDate = new Date('11/14/2023').getTime();
	const nowDate = new Date().getTime();
	let difference_in_weeks = Math.abs(Math.trunc((nowDate - startDate) / (1000 * 3600 * 24 * 7)));

	useEffect(() => {
		setAffixes(rotation[difference_in_weeks])
		setNextWeekAffixes(rotation[difference_in_weeks + 1])

	}, [])

	if (!affixes) return (null);

	return (
		<div className="affixWrapper">
			{nowDate < startDate &&
				<div className="title">
					Season has not yet started. It will start on {new Date(startDate).toDateString()}.
				</div>}

			<div className="title">Week {difference_in_weeks + 1}:</div>
			<WeeklyAffixes affixes={affixes} setAffixes={setAffixes} />
			<br />
			<div className="title">Week {difference_in_weeks + 2}:</div>
			<WeeklyAffixes affixes={nextWeekAffixes} setAffixes={setNextWeekAffixes} />
		</div>
	)
}


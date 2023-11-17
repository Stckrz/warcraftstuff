import React from 'react';
import { useState, useEffect } from 'react';
import './vaultstats.css';
import { vaultrewardsarray } from './vaultrewards';

export function VaultStats(props) {
	const { rundata } = props;
	const [weeklyKeyNumbers, setWeeklyKeyNumbers] = useState([]);


	function getWeeklyKeyLevels(arr) {
		let levelsArr = []
		arr.map((item) => {
			levelsArr.push(item.mythic_level)
		})
		return levelsArr
	}

	useEffect(() => {
		setWeeklyKeyNumbers(getWeeklyKeyLevels(rundata))

	}, [rundata])


	return (
		<>
			<div className="vaultwrapper">
			{weeklyKeyNumbers.length >= 1 ?
				<div className="reward-wrapper">
						reward 1: <div>{weeklyKeyNumbers[0]}</div> 
					<div>{vaultrewardsarray.find(item => item.level === weeklyKeyNumbers[0]).reward}</div>
					</div>:<div>reward 1: --</div>}

			{weeklyKeyNumbers.length >= 3 ?
				<div className="reward-wrapper">
						reward 2: <div>{weeklyKeyNumbers[2]}</div> 
					<div>{vaultrewardsarray.find(item => item.level === weeklyKeyNumbers[2]).reward}</div>

					</div>:<div>reward 2: --</div>}
			
			{weeklyKeyNumbers.length >= 8 ? 
				<div className="reward-wrapper">
						reward 3: <div>{weeklyKeyNumbers[7]}</div>
					<div>{vaultrewardsarray.find(item => item.level === weeklyKeyNumbers[7]).reward}</div>
					</div>:<div>reward 3: --</div>}
				</div>
		</>


	)
}

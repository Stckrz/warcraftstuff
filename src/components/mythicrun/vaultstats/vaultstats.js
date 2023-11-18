import React from 'react';
import { useState, useEffect } from 'react';
import './vaultstats.css';
import { vaultrewardsarray } from './vaultrewards';
import { VaultBox } from './vaultbox/vaultbox';

export function VaultStats(props) {
	const { rundata } = props;
	const [weeklyKeyNumbers, setWeeklyKeyNumbers] = useState([]);

	function findIlvlReward(i) {
		return vaultrewardsarray.find(item => item.level === weeklyKeyNumbers[i]).reward
	}

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
					<VaultBox 
						boxnumber={1} 
						keylevel={weeklyKeyNumbers[0]} 
						ilvlreward={findIlvlReward(0)} 
					/>
					: <div className="no-reward-wrapper">reward 1: <div>--</div></div>}

				{weeklyKeyNumbers.length >= 3 ?
					<VaultBox 
						boxnumber={2} 
						keylevel={weeklyKeyNumbers[2]} 
						ilvlreward={findIlvlReward(2)} 
					/>
					: <div className="no-reward-wrapper">reward 2: <div>--</div></div>}

				{weeklyKeyNumbers.length >= 8 ?
					<VaultBox 
						boxnumber={3} 
						keylevel={weeklyKeyNumbers[7]} 
						ilvlreward={findIlvlReward(7)} 
					/>
					: <div className="no-reward-wrapper">reward 3: <div>--</div></div>}
			</div>
		</>


	)
}

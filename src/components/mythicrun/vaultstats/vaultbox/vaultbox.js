import React from 'react';
import { useState, useEffect } from 'react';
import './vaultbox.css';
import * as rarityStyles from 'library/rarityStyles.js'


export function VaultBox(props) {
	const { boxnumber, keylevel, ilvlreward } = props;
	const [rarityColor, setRarityColor] = useState({color: "white"});


	function rarityColorHandler() {
		keylevel < 10 ? setRarityColor(rarityStyles.commonStyle)
			: keylevel < 15 ? setRarityColor(rarityStyles.uncommonStyle)
				: keylevel < 20 ? setRarityColor(rarityStyles.rareStyle)
					: setRarityColor(rarityStyles.leggoStyle)
	
	}

	useEffect(() => {
		rarityColorHandler()
	}, [keylevel])

	return (
		<>
			<div className="reward-wrapper" style={
				{ border: `1px solid ${rarityColor.color}`, boxShadow: `0px 0px 5px 3px ${rarityColor.color}` }
			}>
				<div className="reward-text">reward {boxnumber}:</div>
					<div className="key-level"
						style={
							{ color: rarityColor.color }
						}>{keylevel}</div>

				<div className="ilvl-reward"
					style={
						{ color: rarityColor.color }
					}>{ilvlreward}</div>
			</div>
		</>
	)
}

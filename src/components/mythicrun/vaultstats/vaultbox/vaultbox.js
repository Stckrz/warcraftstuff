import React from 'react';
import { useState, useEffect } from 'react';
import './vaultbox.css';
import * as rarityStyles from 'library/rarityStyles.js'


export function VaultBox(props) {
	const { boxnumber, keylevel, ilvlreward } = props;
	const [rarityColor, setRarityColor] = useState({color: "white"});

	useEffect(() => {
		setRarityColor(rarityStyles.keyRarityColorHandler(keylevel))
	}, [keylevel])

	return (
		<>
			<div className="reward-wrapper" style={
				{ border: `1px solid ${rarityColor}`, boxShadow: `0px 0px 5px 3px ${rarityColor}` }
			}>
				<div className="reward-text">reward {boxnumber}:</div>
					<div className="key-level"
						style={
							{ color: rarityColor }
						}>{keylevel}</div>

				<div className="ilvl-reward"
					style={
						{ color: rarityColor }
					}>{ilvlreward}</div>
			</div>
		</>
	)
}

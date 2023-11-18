import React from 'react';
import { MythicIcon } from 'components/affixes/mythicicon';
import './singlerun.css';
import * as rarityStyles from 'library/rarityStyles.js';
import { useEffect, useState } from 'react';
import { wait } from '@testing-library/user-event/dist/utils';

export function SingleRun(props) {
	const { level, completed_at, dungeon, affixes, completed } = props;
	const [rarityColor, setRarityColor] = useState("grey");

useEffect(()=>{
	setRarityColor(rarityStyles.keyRarityColorHandler(level))
		},[level])
	
	return (
		<div className="mplus-wrapper" style={
			{border: `2px solid ${rarityColor}`, boxShadow: `0px 0px 2px 2px ${rarityColor}`}}>
			<div className="dungeon-details">
				<div className="infowrap">
					<div className="dungeon-name">{dungeon}</div>
					<div>{level}</div>
					<div>{new Date(completed_at).toLocaleDateString()}</div>
				</div>
				<div>{completed}</div>
				<div className="mythiciconwrap">
					{affixes.map((affix) => {
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
	);
}

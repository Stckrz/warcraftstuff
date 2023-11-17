import React from 'react';
import { MythicIcon } from 'components/affixes/mythicicon';
import './singlerun.css';

export function SingleRun(props) {
	const { level, completed_at, dungeon, affixes, completed } = props;

	return (
		<div className="mplus-wrapper">
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

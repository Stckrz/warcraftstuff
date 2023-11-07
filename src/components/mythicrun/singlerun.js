import React from 'react'
import { MythicIcon } from 'components/affixes/affixes';

export function SingleRun(props) {
	const { level, completed_at, dungeon, affixes } = props;

	return (
		<div className="wrapper">
			<div className="dungeon-details">
				{dungeon}
				<br />
				{level}
				<br />
				{new Date(completed_at).toLocaleDateString()}
			</div>
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
	);
}

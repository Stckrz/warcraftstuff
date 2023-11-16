import React from 'react';
import { MythicRunSummary } from 'components/mythicrun/mythicrun';
import { CharacterRaidProgress } from 'components/playerraidprogress/playerraidprogress';
import { ArenaSummary } from 'components/pvp/pvpsummary/pvpsummary';

export function CharacterSummary(props) {
	const { characterName, characterRealm } = props;

	return (
		<>
			<div className='content'>
				<div className="raid">
					<p>raid progress</p>
					<CharacterRaidProgress characterName={characterName} characterRealm={characterRealm} />
				</div>
				<div className="mythicplus">
					<p>mythic plus</p>
					<MythicRunSummary characterRealm={characterRealm} characterName={characterName} />
				</div>
				<div className="arena">
					<p>arena</p>
					<ArenaSummary characterRealm={characterRealm} characterName={characterName} />
				</div>
			</div>
		</>
	)
}

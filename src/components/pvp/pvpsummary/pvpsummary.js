import React from 'react';
import { useState, useEffect } from 'react';
import { ArenaRatingBracket } from 'components/pvp/ratingbracket/ratingbracket';
import { token } from 'library/oauth';
import './pvpsummary.css';

export function ArenaSummary(props) {
	const [twosRating, setTwosRating] = useState();
	const [threesRating, setThreesRating] = useState();
	const { characterName, characterRealm } = props;

	async function fetchTwosData() {
		const response = await fetch(`https://us.api.blizzard.com/profile/wow/character/${characterRealm}/${characterName}/pvp-bracket/2v2?namespace=profile-us&locale=en_US&access_token=${token}`);
		const fetchedData = await response.json();
		setTwosRating(fetchedData) 
	}

	async function fetchThreesData() {
		const response = await fetch(`https://us.api.blizzard.com/profile/wow/character/${characterRealm}/${characterName}/pvp-bracket/3v3?namespace=profile-us&locale=en_US&access_token=${token}`);
		const fetchedData = await response.json();
		setThreesRating(fetchedData)
	}


	useEffect(() => {
		fetchTwosData();
		fetchThreesData();
	}, [characterName])
	if (!twosRating) return (null);
	if (!threesRating) return (null);

	return (
		<div className="bracketwrapper">
			{twosRating.rating !== undefined ?
				<ArenaRatingBracket
					bracket={'2v2'}
					rating={twosRating.rating}
					won={twosRating.season_match_statistics.won}
					lost={twosRating.season_match_statistics.lost}
					played={twosRating.season_match_statistics.played}
				/>
				: <div>No 2's data</div>}
			<br />

			{threesRating.rating !== undefined ?
			<ArenaRatingBracket
				bracket={'3v3'}
				rating={threesRating.rating}
				won={threesRating.season_match_statistics.won}
				lost={threesRating.season_match_statistics.lost}
				played={threesRating.season_match_statistics.played}
			/>
			: <div>No 3's data</div>}
		</div>
	);
}

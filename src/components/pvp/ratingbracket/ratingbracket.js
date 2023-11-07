import React from 'react';
import './ratingbracket.css';

export function ArenaRatingBracket(props) {
	const { rating, won, lost, played, bracket } = props;
	return (
		<div className="arena-rating-wrapper">
			<div className='rating'>
				<p>{bracket}</p>
				{rating}
			</div>
				<div>
				{`played: ${played}`}
				</div>
				<br />
				<div>
				{`won: ${won}`}
				<br />
				{`lost: ${lost}`}
				</div>
		</div>
	)
}

import React from 'react';


export function ArenaRatingBracket(props) {
	const { rating, won, lost, played } = props;

	return (

		<>
			<div className='rating'>
				{rating}
			</div>
			<div className='match-stats'>
				{`played: ${played}`}
				<br />
				{`won: ${won}`}
				<br />
				{`lost: ${lost}`}
			</div>
		</>

	)






}

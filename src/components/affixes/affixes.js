import React from 'react';
import { useState, useEffect } from 'react';

export function Affixes() {
	const [affixes, setAffixes] = useState();

	async function fetchAffixes() {
		const response = await fetch('https://raider.io/api/v1/mythic-plus/affixes?region=us&locale=en');
		const fetchedAffixes = await response.json();
		setAffixes(fetchedAffixes.affix_details);
	}

	async function fetchWowAff(number) {
		const response = await fetch(`https://us.api.blizzard.com/data/wow/media/keystone-affix/${number}?namespace=static-us&locale=en_US&access_token=USMr6x7dhDV5Wr4MUHx0AL3gYECjG1XSWv`);
		const fetchedAffixes = await response.json();
		return fetchedAffixes.assets[0].value;
		
	}

	function setIconHandler(id) {
		setAffixes(
			affixes.map((item) => {
				if (item.id === id) {
					return { ...item, icon: fetchWowAff(id)};
				} else {
					return item;
				}
			})
		)
	}
	// setIconHandler(2);
	useEffect(() => {
		fetchAffixes()

	}, []);

	if (!affixes) return (null);


	return (
		<div>
		<button onClick={()=>{ {setIconHandler(3)} }}>click</button>
			{
				affixes.map((item) => {
					{
						return (
							<>
								<div>{item.name}</div>
								<div>{item.description}</div>
								<div>{item.id}</div>
								<br />
							</>
						)
					}
				})}
			<pre>

				{JSON.stringify(affixes, null, 2)}
			</pre>
		</div>
	)
}

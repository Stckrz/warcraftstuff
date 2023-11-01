import React from 'react';
import { useState, useEffect } from 'react';
import './affixes.css'

export function Affixes() {
	const [affixes, setAffixes] = useState();

	async function fetchAffixes() {
		const response = await fetch('https://raider.io/api/v1/mythic-plus/affixes?region=us&locale=en');
		const fetchedAffixes = await response.json();
		setAffixes(fetchedAffixes.affix_details);
	}

	function setShownHandler() {
		affixes.map((item) => {
			item.isShown = false;
		})
	}

	function handleShowClick(str) {
		setAffixes(
			affixes.map((item) => {
				if (item.name === str) {
					return { ...item, isShown: true };
				} else {
					return { ...item, isShown: false };
				}
			})
		)
	}

	useEffect(() => {
		fetchAffixes()
	}, []);

	if (!affixes) return (null);

	return (
		<div className="affixWrapper">
			{
				affixes.map((item) => {
					{
						return (
							<>
								<div className='itemWrapper' onClick={() => {
									{ setShownHandler() };
									{ handleShowClick(item.name) }
								}}>
									<div className = "butt">
										<div className='itemIcon'>
											<MythicIcon id={item.id} />
										</div>
										<div className="itemName">
											{item.name}
										</div>
									</div>

									<div className="description-box">{item.isShown && item.description}
									</div>
								</div>
							</>

						)
					}
				})}
			{/*
			<pre>

				{JSON.stringify(affixes, null, 2)}
			</pre>
			*/}
		</div>
	)
}

export function MythicIcon(id) {
	const [icon, setIcon] = useState();
	async function fetchWowAff(number) {
		const response = await fetch(`https://us.api.blizzard.com/data/wow/media/keystone-affix/${number.id}?namespace=static-us&locale=en_US&access_token=USVI4TFLQ61F2vXQqyg0QYHGXe29FIZory`);


		const fetchedAffixes = await response.json();
		setIcon(fetchedAffixes.assets[0].value);
	}
	useEffect(() => {
		fetchWowAff(id);
	}, []);
	return (
		<img src={icon} />
	)
}

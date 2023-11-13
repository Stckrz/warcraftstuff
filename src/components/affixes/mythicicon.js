import React from 'react';
import { useState, useEffect } from 'react';
import { token } from 'library/oauth';

export function MythicIcon(props) {
	const { id } = props;
	const [icon, setIcon] = useState();
	async function fetchWowAff(number) {
		const response = await fetch(`https://us.api.blizzard.com/data/wow/media/keystone-affix/${number}?namespace=static-us&locale=en_US&access_token=${token}`);
		const fetchedAffixes = await response.json();
		setIcon(fetchedAffixes.assets[0].value);
	}
	useEffect(() => {
		fetchWowAff(id);
	}, [id]);
	return (
		<img src={icon} />
	)
}

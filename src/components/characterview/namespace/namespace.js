import React from 'react';
import { useState, useEffect } from 'react';
import './namespace.css';
import { token } from 'library/oauth';

export function Namespace(props) {
	const { characterName, race, characterClass, realm, title, level, last_login, item_level } = props
	const [thumbnailURL, setThumbnailURL] = useState();

	async function fetchThumbnail() {
		const response = await fetch(`https://us.api.blizzard.com/profile/wow/character/${realm}/${characterName}/character-media?namespace=profile-us&locale=en_US&access_token=${token}`)
		const fetchedData = await response.json();
		if (response.status === 200) {
			setThumbnailURL(fetchedData?.assets[0].value);
		} else {
			setThumbnailURL("")
		}
	}

	useEffect(() => {
		fetchThumbnail()
	}, [characterName]);

	return (
		<>
			<div className="thumbnail">
				<img src={thumbnailURL} />
			</div>
			<div className="textwrapper">
				<div className="text-stuff">
					<div>{title !== undefined ? title.replace("{name}", characterName.charAt(0).toUpperCase() + characterName.slice(1))
						: characterName.charAt(0).toUpperCase() + characterName.slice(1)}</div>
					<div>{level} {race} {characterClass}</div>
				</div>
				<div className="text-stuff">Ilvl Equipped: {item_level}</div>
				<div className="text-stuff">last login: {new Date(last_login).toLocaleDateString()}</div>
			</div>
		</>
	)
}

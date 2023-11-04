import React from 'react';
import { useState, useEffect } from 'react';
import './mythicrun.css';
import { MythicIcon } from './../affixes/affixes'

export function MythicRun(props) {
	const { characterName } = props;
	const [rundata, setRunData] = useState();
	const [toggle, setToggle] = useState(false);

	async function fetchData() {
		const response = await fetch(`https://raider.io/api/v1/characters/profile?region=us&realm=chogall&name=${characterName}&fields=mythic_plus_recent_runs`)
		const fetchedData = await response.json();
		setRunData(fetchedData.mythic_plus_recent_runs)

	}

	function getIdHandler(url) {
		return url.match(/.+\/(\d+)-/)[1]

	}

	// url.matches(/.+\/(\d+)-)[1]
	useEffect(() => {
		fetchData()

	}, [characterName])
	if (!rundata) return (null);


	return (
			<div className="mrunwrap">
				{rundata.map((item) => {
					{
						return (
							<div className='mythicwrapper' onClick={() => { setToggle(!toggle) }}>
								<div className="dungeonbasic">
									{item.dungeon}
									<br />
									{item.mythic_level}<br />{new Date(item.completed_at).toLocaleDateString()}
									<div className="mythiciconwrap">
										{item.affixes.map((affix) => {
											{
												return (
													<a href={affix.wowhead_url} target={"_blank"}><div className="mythicicon"><MythicIcon id={affix.id} /></div></a>
												)
											}
										})}
									</div>
								</div>
								{/*
								<div className="rundetails"><button onClick={async () => {

									const response = await fetch(`https://raider.io/api/v1/mythic-plus/run-details?season=season-df-2&id=23002692`)
									const fetchedData = await response.json();
									console.log(fetchedData);
								}}></button></div>*/}
								{/* <div className="rundetails"><MythicRunDetails id={getIdHandler(item.url)}/></div>*/}
		{/*<pre>{JSON.stringify(rundata, null, 2)}</pre>*/}
							</div>
						)
					}
				})}
			</div>

	)

}


export function MythicRunDetails(props) {
	const [rundata, setRunData] = useState();
	const { id } = props;
	// console.log(id)

	async function fetchData() {
		const response = await fetch(`https://raider.io/api/v1/mythic-plus/run-details?season=season-df-2&id=${id}`)
		const fetchedData = await response.json();
		setRunData(fetchedData)

	}
	// useEffect(() => {
	// 	fetchData();
	//
	// }, [])
	return (<div><button onClick={fetchData}>click!</button>
		{/*<pre>{JSON.stringify(rundata, null, 2)}</pre>*/}
	</div>)


}

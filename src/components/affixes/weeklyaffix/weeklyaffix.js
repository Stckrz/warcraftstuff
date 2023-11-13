import React from 'react';
import { useEffect } from 'react';
import { MythicIcon } from '../mythicicon';
import './weeklyaffix.css';

export function WeeklyAffixes(props) {
	const { affixes, setAffixes } = props;

	function setShownHandler() {
		affixes.map((item) => {
			item.isShown = false;
		});
	};

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

	}, []);

	if (!affixes) return (null);

	return (
		<>
			<div className="weeklywrapper">
				{
					affixes.map((item) => {
						{
							return (
								<>
									<div className='itemWrapper' onClick={() => {
										{ setShownHandler() };
										{ handleShowClick(item.name) }
									}}>
										<div className="butt">
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
			</div>
		</>
	)
}


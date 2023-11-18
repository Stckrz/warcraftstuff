
import React from 'react';
import { useState, useEffect } from 'react';
import { SingleGear } from 'components/gear/singlegear/singlegear';

export function CharacterEquipment(props) {
	const [data, setData] = useState();
	const [itemArray, setItemArray] = useState([])

	async function fetchData() {
		const response = await fetch('https://us.api.blizzard.com/profile/wow/character/chogall/blassphamy/equipment?namespace=profile-us&locale=en_US&access_token=USW4BwtIt4EUtd97NygkMesK9R3m0N7Qwq')
		const fetchedData = await response.json();
		if (response.status === 200) {
			setData(fetchedData)
			setItemArray(fetchedData.equipped_items)
		} else {
			setData([])
			setItemArray([])
		}

	}


	useEffect(() => { fetchData() }, [data])

	return (
		<>
			{/* {console.log(itemArray[0])} */}
		{itemArray[0] !== undefined ? 
			<SingleGear item={itemArray[0]} />
			/* { */
			/* 	itemArray.map((item) => { */
			/* 		return <SingleGear item={item} /> */
			/**/
			/* 	}) */
			/* } */
			/* <SingleGear /> */
			: <div> NO BITCH </div>}
			<pre>
				{/* {JSON.stringify(itemArray, null, 2)} */}
			</pre>
		</>
	)


}


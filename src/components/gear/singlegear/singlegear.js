import React from 'react';
import { useState, useEffect } from 'react';

export function SingleGear(props){
	const { item } = props;
	const [itemstats, setItemStats] = useState([]);
	useEffect(()=>{
		itemStats()
		},[item])
	
	function itemStats(){
		setItemStats({
			name: item.name,
			slot: item.slot.name,
			quality: item.quality.name,
			subclass: item.item_subclass.name,
			binding: item.binding.name,
			armor: item.armor.value,
			ilvl: item.level.value
		})

	}


	return(
		<>
	<div>{itemstats.ilvl}</div>
		  <pre>    
			{ JSON.stringify(item, null, 2)}    
		 </pre>     
		 </>

	)


}


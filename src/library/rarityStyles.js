
export const commonStyle = {
	color: "#1eff00"
}

export const uncommonStyle = {
	color: "#0070dd"
}

export const rareStyle = {
	color: "#a335ee"
}

export const leggoStyle = {
	color: "#ff8000"
}

//returns a hexcode color value based on key level
export function keyRarityColorHandler(keylevel){
	let	color = "";
	keylevel < 10 ? color = commonStyle.color
	: keylevel < 15? color = uncommonStyle.color
	: keylevel < 20 ? color = rareStyle.color
	: color = leggoStyle.color;
	return color;
}


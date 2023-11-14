import './home.css';
import {Link} from 'react-router-dom';

const About = () => {
	return(
	<div className="homewrap">
			<img src='https://render.worldofwarcraft.com/us/guild/crest/188/emblem-188-b1b8b1-006391.jpg'/>
			<div className="guildname">Inebriated Raiding</div>
			<div className = "quicklinks">
			<span className="quicklinkbutton"><Link to="/affixes">Affixes</Link></span>
			<span className="quicklinkbutton"><Link to="/charactersearch">Character Info</Link></span>
			</div>
	</div>
	)
}

export default About;

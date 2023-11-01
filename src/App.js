import logo from './logo.svg';
import './App.css';
import { Leaderboard, Playground } from './components/playground/playground';
import { Affixes } from './components/affixes/affixes'
import { CharacterOverview } from './components/characterview/characterview';
import { GuildRosterList } from './components/guildroster/guildroster'; 
const charname="blassphamy"
function App() {
  return (
    <div className="App">
{/*			<Leaderboard />*/}
			<Affixes />
		{/*	<CharacterOverview characterName={charname} />*/}
			<GuildRosterList />
    </div>
  );
}

export default App;

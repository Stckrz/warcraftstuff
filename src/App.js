import logo from './logo.svg';
import './App.css';
import { Leaderboard, Playground } from './components/playground/playground';
import { Affixes } from './components/affixes/affixes'
import { CharacterOverview } from './components/characterview/characterview';
const charname="blassphamy"
function App() {
  return (
    <div className="App">
{/*			<Leaderboard />*/}
			<Affixes />
			<CharacterOverview characterName={charname} />
    </div>
  );
}

export default App;

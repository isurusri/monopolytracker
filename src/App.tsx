import { useState } from "react";
import "./App.css";
import PlayerList from "./components/PlayerList";
import { PlayerInt } from "./interfaces/PlayerInt";

const App = () => {
  const [players, setPlayers] = useState<PlayerInt[]>([]);
  const [newPlayerName, setNewPlayerName] = useState<string>("");
  const [tokens, setTokens] = useState<string[]>([
    "🎩",
    "🔨",
    "🐶",
    "⛴️",
    "🏎️",
    "👢",
    "🛒",
    "🐱",
  ]);
  const [selectedToken, setSelectedToken] = useState<string>();

  const addPlayer = () => {
    if (!newPlayerName) {
      alert("Please enter a name for the player.");
      return;
    }
    if (!selectedToken) {
      alert("Please select a token for the player.");
      return;
    }
    const newPlayer: PlayerInt = {
      id: players.length + 1,
      name: newPlayerName,
      token: selectedToken,
    };
    setPlayers([...players, newPlayer]);
    setNewPlayerName("");
    setTokens(tokens.filter((token) => token !== selectedToken));
    setSelectedToken("");
  };

  return (
    <div className="App">
      <h1 className="text-light my-3">Monopoly Tracker</h1>
      <div className="container text-center mb-5">
        <div className="row justify-content-md-center">
          <div className="col col-lg-2">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Player Name"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
            />
          </div>
          <div className="col col-lg-2">
            <select
              className="form-select"
              value={selectedToken}
              onChange={(e) => {
                const selected = tokens.find(
                  (token) => token === e.target.value
                );
                setSelectedToken(selected);
              }}
            >
              <option defaultValue="">Select a token</option>
              {tokens.map((token) => (
                <option key={token} value={token}>
                  {token}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-auto">
            <button
              type="button"
              className="btn btn-success"
              onClick={addPlayer}
            >
              Add Player
            </button>
          </div>
        </div>
      </div>
      <PlayerList players={players} />
    </div>
  );
};

export default App;

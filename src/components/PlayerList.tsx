import { useState } from "react";
import { PlayerInt } from "../interfaces/PlayerInt";
import Player from "./Player";

interface Props {
  players: PlayerInt[];
}

export default function PlayerList({ players }: Props) {
  const [properties, setProperties] = useState<string[]>([
    "Mediterranean Avenue",
    "Baltic Avenue",
    "Oriental Avenue",
    "Vermont Avenue",
    "Connecticut Avenue",
    "St. Charles Place",
    "States Avenue",
    "Virginia Avenue",
    "St. James Place",
    "Tennessee Avenue",
    "New York Avenue",
    "Kentucky Avenue",
    "Indiana Avenue",
    "Illinois Avenue",
    "Atlantic Avenue",
    "Ventnor Avenue",
    "Marvin Gardens",
    "Pacific Avenue",
    "North Carolina Avenue",
    "Pennsylvania Avenue",
    "Park Place",
    "Boardwalk",
    "Reading Railroad",
    "Pennsylvania Railroad",
    "B&O Railroad",
    "Short Line",
    "Electric Company",
    "Water Works",
  ]);

  const addProperty = (newProperty: string) => {
    setProperties(properties.filter((property) => property !== newProperty));
  };

  const removeProperty = (property: string) => {
    setProperties([...properties, property]);
  };

  return (
    <>
      {players.length > 0 && (
        <>
          <h4 className="text-center">Player List</h4>
          <div className="container text-center">
            <div className="row row-cols-auto justify-content-center">
              {players.map((player) => (
                <Player
                  key={player.id}
                  id={player.id}
                  name={player.name}
                  token={player.token}
                  properties={properties}
                  addProperties={addProperty}
                  removeProperties={removeProperty}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

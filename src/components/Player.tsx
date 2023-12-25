import { useState } from "react";

interface Props {
  id: number;
  name: string;
  token: string;
  properties: string[];
  addProperties: (property: string) => void;
  removeProperties: (property: string) => void;
}

export default function Player({
  id,
  name,
  token,
  properties,
  addProperties,
  removeProperties,
}: Props) {
  const [selectedProperty, setSelectedProperty] = useState<string>();
  const [ownedProperties, setOwnedProperties] = useState<string[]>([]);
  const [mortgage, setMortgage] = useState<string[]>([]);

  const addProperty = () => {
    if (!selectedProperty) {
      alert("Please select a property to add.");
      return;
    }
    setOwnedProperties([...ownedProperties, selectedProperty]);
    addProperties(selectedProperty);
    setSelectedProperty("");
  };

  const mortgageProperty = (property: string) => {
    setMortgage([...mortgage, property]);
    setOwnedProperties(ownedProperties.filter((p) => p !== property));
  };

  const releaseProperty = (property: string) => {
    setOwnedProperties([...ownedProperties, property]);
    setMortgage(mortgage.filter((p) => p !== property));
  };

  const sellProperty = (property: string) => {
    setOwnedProperties(ownedProperties.filter((p) => p !== property));
    removeProperties(property);
  };

  return (
    <>
      <div key={id} className="card text-bg-warning col m-3">
        <div className="card-header text-bg-danger border border-black border-4 m-3 rounded-pill">
          <h2>{name}</h2>
          <h5>{token}</h5>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <select
              className="form-select mb-2"
              value={selectedProperty}
              onChange={(e) => {
                const selected = properties.find(
                  (property) => property === e.target.value
                );
                setSelectedProperty(selected);
              }}
            >
              <option defaultValue="">Select a property</option>
              {properties.map((property) => (
                <option key={property} value={property}>
                  {property}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="btn btn-primary"
              onClick={addProperty}
            >
              Add Property
            </button>
          </div>
          <div>
            <h4>Properties</h4>
            <ul className="list-group m-2">
              {ownedProperties.map((property) => (
                <li
                  key={property}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {property}
                  <button
                    type="button"
                    className="btn btn-success mx-2"
                    onClick={() => mortgageProperty(property)}
                  >
                    Mortgage
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger mx-2"
                    onClick={() => sellProperty(property)}
                  >
                    Sell
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            {mortgage.length > 0 && (
              <>
                <h4>Mortgage</h4>
                <ul className="list-group m-2">
                  {mortgage.map((property) => (
                    <li
                      key={property}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      {property}
                      <button
                        type="button"
                        className="btn btn-success mx-2"
                        onClick={() => releaseProperty(property)}
                      >
                        Release
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

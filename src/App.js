import React, { useState } from "react";
import "./App.css";
import data from "./mock-data.json";
import optionsData from "./options.json";


function csvToJson(csv) {
  const lines = csv.trim().split('\n');
  const headers = lines.shift().split(',');
  const json = [];

  lines.forEach((line) => {
    const values = line.split(',');
    const entry = {};

    headers.forEach((header, index) => {
      entry[header] = values[index];
    });

    json.push(entry);
  });

  return json;
}

const App = () => {
  // Load the options from the JSON file
  const [options] = useState(optionsData);

  // Load contacts from json, parse instead but not here...
  const [contacts] = useState(data);

  // Store the selected options for each column
  const [selectedOptions, setSelectedOptions] = useState({});

  // Handle change event of the select element
  const handleSelectChange = (event, columnName) => {
    const { value } = event.target;
    setSelectedOptions(prevSelectedOptions => ({
      ...prevSelectedOptions,
      [columnName]: value
    }));
  };

  // HTML Return
  return (
    <div className="app-container">
      <table>
        <thead>
          <tr>
            {Object.keys(contacts[0]).map(key => (
              <th key={key}>
                <select
                  value={selectedOptions[key] || ""}
                  onChange={event => handleSelectChange(event, key)}
                >
                  <option value="">-- Select Option --</option>
                  {options.map(option => (
                    <option
                      key={option.value}
                      value={option.value}
                      disabled={
                        option.value !== "Ignore" && Object.values(selectedOptions).includes(option.value) &&
                        selectedOptions[key] !== option.value
                      } 
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => (
            <tr key={contact.id}>
              {Object.values(contact).map(value => (
                <td key={value}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;

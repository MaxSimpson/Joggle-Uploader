import React, { useState } from "react";
import "./App.css";
import data from "./mock-data.json";
import optionsData from "./options.json";
import Papa from 'papaparse';

const UploadScreen = ({ onUpload }) => {
  const [includeHeader, setIncludeHeader] = useState(true);

  const handleFileUpload = event => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const csvData = reader.result;
      const dataArray = parseCSVData(csvData);
      onUpload(dataArray);
    };
    reader.readAsText(file);
  };

  const parseCSVData = csvData => {
    // Parse the CSV data and return the parsed array
    // You can use a third-party library like csv-parser or papaparse for parsing CSV data
    // Here's an example using papaparse library
    const parsedData = Papa.parse(csvData, { header: includeHeader }).data;
    return parsedData;
  };

  const handleCheckboxChange = event => {
    setIncludeHeader(event.target.checked);
  };

  return (
    <div>
      <h1>Upload CSV</h1>
        <label>
          Has Headers:
          <input type="checkbox" checked={includeHeader} onChange={handleCheckboxChange} />
        </label>
        <br/>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
    </div>
  );
};


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
  const [dataArray, setDataArray] = useState([]);

  const handleUpload = data => {
    setDataArray(data);
    console.log("STORED DATA")
    console.log(data)
  };

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
      <UploadScreen onUpload={handleUpload} />

      {/* <table>
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
      </table> */}
    </div>
  );
};

export default App;

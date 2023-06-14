import React, { useState } from "react";
import optionsData from "./options.json";
import Papa from 'papaparse';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

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
    const parsedData = Papa.parse(csvData, { header: includeHeader }).data;
    return parsedData;
  };

  const handleCheckboxChange = event => {
    setIncludeHeader(event.target.checked);
  };

  return (
    <div>
      <h1>CSV Uploader</h1>
        <label>
          Has Headers:
          <input type="checkbox" checked={includeHeader} onChange={handleCheckboxChange} />
        </label>
        <br/>
      
      <input type="file" accept=".csv" onChange={handleFileUpload} />
    </div>
  );
};


const App = () => {
  const [dataArray, setDataArray] = useState([]);

  const handleUpload = data => {
    setDataArray(data);
  };

  // Load the options from the JSON file
  const [options] = useState(optionsData);

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
  // If no CSV then ask for csv upload
  if (dataArray.length === 0) {
    return <div className="app-container">
              <UploadScreen onUpload={handleUpload} />
            </div>
  } else { // Data has been uploaded so display in table format
    return (
      <div className="app-container">
        <Table>
          <TableHead>
            <TableRow>
              {dataArray.length > 0 &&
              dataArray[0].map((value, columnIndex) => (
                <TableCell key={columnIndex}>
                  <Select
                    value={selectedOptions[columnIndex] || ''}
                    onChange={event => handleSelectChange(event, columnIndex)}
                  >
                    <MenuItem value="">-- Select Option --</MenuItem>
                    {options.map(option => (
                      <MenuItem
                        key={option.value}
                        value={option.value}
                        disabled={
                          option.value !== 'Ignore' &&
                          Object.values(selectedOptions).includes(option.value) &&
                          selectedOptions[columnIndex] !== option.value
                        }
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataArray.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((value, columnIndex) => (
                  <TableCell key={columnIndex}>{value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  } 
};

export default App;

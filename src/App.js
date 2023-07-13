import React, { useState } from "react";
import optionsData from "./options.json";

import { Button, Table, TableBody, TableCell, TableHead, TableRow, Grid } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import UploadScreen from './UploadScreen';
import './App.css';
import debug from "debug";


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

  // Continue button check
  const isButtonDisabled = Object.values(selectedOptions).length == dataArray.length && !Object.values(selectedOptions).includes("")

  // HTML Return
  // If no CSV then ask for csv upload
  if (dataArray.length === 0) {
    return <div className="app-container">
              <UploadScreen onUpload={handleUpload} />
            </div>
  } else { // Data has been uploaded so display in table format
    return (
      <div className="app-container">
       <Grid container justifyContent="center">
        <Button variant="contained" disabled={!isButtonDisabled}>Continue</Button>
      </Grid>
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

import React, { useState } from 'react';
import { Button, FormControl, FormControlLabel, Checkbox, Typography } from '@mui/material';
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
    const parsedData = Papa.parse(csvData, { header: includeHeader }).data;
    return parsedData;
  };

  const handleCheckboxChange = event => {
    setIncludeHeader(event.target.checked);
  };

  return (
    <FormControl>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h4" fontWeight="bold">Joggle CSV Uploader</Typography>
      </div>
      <FormControlLabel
        control={<Checkbox checked={includeHeader} onChange={handleCheckboxChange} />}
        label="Has Headers"
      />
      <Button variant="contained" component="label">
        Upload CSV File
        <input type="file" accept=".csv" style={{ display: 'none' }} onChange={handleFileUpload} />
      </Button>
    </FormControl>
  );
};

export default UploadScreen;
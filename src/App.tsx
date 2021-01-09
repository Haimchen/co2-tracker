import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

import './App.css';
import UsageForm from './components/UsageForm';
import EmissionsChart from './components/EmissionsChart';
import fetchEmissionData from './api/fetchEmissionData';


export type InputData = {
  date: string, 
  energyConsumption: number, 
  location: string,
}

type DataEntry = InputData & {
  carbonEmission: number, 
}

export type EmissionData = {
  carbon_kg: number,
}

function App() {
  const [data, setData] = useState<DataEntry[]>([]);

  const addEntry = (entry: DataEntry) => {
    const newData = [...data]

    // if there is already an entry for the same date, replace it
    const index = newData.findIndex(item => item.date == entry.date)
    if (index >= 0) {
      newData[index] = entry
    } else {
      newData.push(entry)
    }

    // make sure array is sorted by date
    newData.sort((a, b) => parseInt(a.date) - parseInt(b.date))

    setData(newData);
  }

  const handleNewData = async (input: InputData) => {
    const { carbon_kg } = await fetchEmissionData(input)
    addEntry({...input, carbonEmission: carbon_kg })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>C0<sub>2</sub> Tracker</h1>
        <p>Track the carbon emissions caused by your electricity usage</p>
      </header>
      <section>
        <Grid container alignItems="center" justify="center" direction="column">
          <Grid item>
            <UsageForm onSubmit={handleNewData}/>
          </Grid>
          {data.length > 0 && (
            <Grid item>
              <EmissionsChart data={data}/>
            </Grid>
          )}
        </Grid>
      </section>
    </div>
  );
}

export default App; 

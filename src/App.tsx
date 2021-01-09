import React, { useState } from 'react';
import './App.css';
import UsageForm from './components/UsageForm';
import EmissionsChart from './components/EmissionsChart';


export type InputData = {
  date: string, 
  energyConsumption: number, 
  location: string,
}

type DataEntry = InputData & {
  carbonEmission: number, 
}

type EmissionData = {
  carbon_kg: number,
}

const fetchEmissionData = async (inputData: InputData): Promise<EmissionData | {}> => {
  try {
    const input = {
      type: "electricity",
      electricity_unit: "mwh",
      electricity_value: Number(inputData.energyConsumption),
      country: inputData.location,
    }

    const { data  = {} } = await fetch("https://www.carboninterface.com/api/v1/estimates", {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${process.env.REACT_APP_CI_API_KEY}`,
      }
    }).then(response => response.json());

    const { attributes: emissionData } = data;
    return emissionData;

  } catch (err) {
    console.log(err)
    return {}
  }
}

function App() {
  const [data, setData] = useState<DataEntry[]>([]);

  const addEntry = (entry: DataEntry) => {
    console.log('new entry:', entry);

    // TODO make sure data is sorted?
    // TODO make sure entries are unique by date?
    const newData = [...data, entry]
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
        <UsageForm onSubmit={handleNewData}/>
        {data.length > 0 && (
          <EmissionsChart data={data}/>
        )}
      </section>
    </div>
  );
}

export default App; 

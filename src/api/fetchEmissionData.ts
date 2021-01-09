import type { InputData, EmissionData } from '../App';

const fetchEmissionData = async (inputData: InputData): Promise<EmissionData> => {
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
      // TODO notify user of the error
      return { carbon_kg: 0 }
    }
  }

export default fetchEmissionData;
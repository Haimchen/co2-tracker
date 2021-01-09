import React from 'react';
import { LineChart, Line, Tooltip, XAxis, YAxis } from 'recharts';

const EmissionsChart = ({data}: any) => {

    return (
        <LineChart width={400} height={400} data={data}>
            <Line type="monotone" dataKey="carbonEmission" stroke="#8884d8" />
            <XAxis dataKey="date" />
            <YAxis label={{ value: 'CO2 emissions in kg', angle: -90, position: 'insideLeft' }}/>
            <Tooltip formatter={(value) => [`${value} kg`, "carbon emitted"]}/>
        </LineChart>
    )
}

export default EmissionsChart;
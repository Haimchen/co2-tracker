import React from 'react';
import { Paper } from '@material-ui/core';
import { LineChart, Line, Tooltip, XAxis, YAxis } from 'recharts';

import type { DataEntry } from '../App';

const EmissionsChart = ({data}: { data: DataEntry[]}) => {

    return (
        <Paper className="EmissionsChart-container">
            <LineChart width={400} height={400} data={data}>
                <Line type="monotone" dataKey="carbonEmission" stroke="#8884d8" />
                <XAxis dataKey="date" />
                <YAxis label={{ value: 'CO2 emissions in kg', angle: -90, position: 'insideLeft' }}/>
                <Tooltip formatter={(value) => [`${value} kg`, "carbon emitted"]}/>
            </LineChart>
        </Paper>
    )
}

export default EmissionsChart;
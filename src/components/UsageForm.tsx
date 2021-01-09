import React, { useRef } from 'react';
import { Button, FormControl, FormHelperText, Grid, Input, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { addDays, format } from 'date-fns'

import type { InputData } from '../App';
import useInput from '../hooks/useInput';

const UsageForm = ({ onSubmit }: { onSubmit: (input: InputData) => void}) => {
    const [location, handleLocationChange] = useInput('');
    const [date, handleDateChange] = useInput('');
    const [energyConsumption, handleEnergyConsumptionChange, clearEnergyConsumption] = useInput('');

    const energyInput = useRef<HTMLInputElement>(null);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        event.stopPropagation();

        // automatically select the next day
        // TODO improve API of the handler
        const nextDate = format(addDays(new Date(date), 1), 'yyyy-MM-dd');
        handleDateChange({ target: { value: nextDate }});

        // clear and focus energy consumption input 
        // to allow easy entry of multiple values
        clearEnergyConsumption();
        if (energyInput && energyInput.current){
            energyInput.current.focus();
        }

        onSubmit({ location, date, energyConsumption})
    }

    const blockLocationChange = !!date;

    return (
        <Grid container alignItems="center" justify="center" direction="column">
            <Typography>How much energy have you used over the last week? Enter the value for each day and see how much carbon emissions you have caused </Typography>
            <Grid item>
            <FormControl>
                <InputLabel id="location-select-label">Location</InputLabel>
                <Select
                    disabled={blockLocationChange}
                    labelId="location-select-label"
                    value={location}
                    onChange={handleLocationChange}
                    autoWidth
                >
                    <MenuItem value="" disabled>Select your country</MenuItem>
                    <MenuItem value={'us'}>USA</MenuItem>
                    <MenuItem value={'ca'}>Canada</MenuItem>
                </Select>
                <FormHelperText>{blockLocationChange ? "You can't change the location during data entry. You need to start over with another location" : "Select your country to get more precise emission data"}</FormHelperText>
            </FormControl>
            </Grid>
            <Grid item>
            <TextField
                id="date"
                label="Date"
                type="date" 
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={handleDateChange}
                required
                placeholder="Select a date"
                value={date}
                helperText={date ? "Next date will be automatically selected" : "Pick a date at least one week in the past"}
            />
            </Grid>
            <form onSubmit={handleSubmit}>
                <Grid item>
                <FormControl>
                    <InputLabel>{ date ? `Energy usage on ${date}` : "Energy usage"}</InputLabel>    
                    <Input
                        placeholder="Enter your energy consumption in mwh"
                        type="number"
                        required
                        value={energyConsumption}
                        onChange={handleEnergyConsumptionChange}
                        inputProps={{ min: 0, step: 0.0001 }}
                        ref={energyInput}
                        />
                </FormControl>
                </Grid>
                <Button type="submit">Submit</Button>
            </form>      
        </Grid>
    )
}

export default UsageForm;
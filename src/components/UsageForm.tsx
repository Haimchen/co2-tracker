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

    const dataIsComplete = () => location && date && Number(energyConsumption) >= 0;

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        event.stopPropagation();

        if (!dataIsComplete()) {
            return;
        }
        
        onSubmit({ location, date, energyConsumption})

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
    }

    const blockLocationChange = !!date;

    return (
        <form onSubmit={handleSubmit}>
            <Grid container alignItems="center" justify="center" direction="column" className="UsageForm-container">
                <Grid item>
                    <Typography variant="h5">How much energy have you used over the last week? </Typography>
                    <Typography variant="subtitle2" gutterBottom>Enter the value for each day and see how much carbon emissions you have caused </Typography>
                </Grid>
                <Grid item>
                    <FormControl>
                        <InputLabel id="location-select-label">Location</InputLabel>
                        <Select
                            disabled={blockLocationChange}
                            labelId="location-select-label"
                            value={location}
                            onChange={handleLocationChange}
                            autoWidth
                            required
                        >
                            <MenuItem value="" disabled>Select your country</MenuItem>
                            <MenuItem value={'us'}>USA</MenuItem>
                            <MenuItem value={'ca'}>Canada</MenuItem>
                        </Select>
                        <FormHelperText>{blockLocationChange ? "You can't change the location during data entry." : "Select your country to get more precise emission data"}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item container direction="row" alignItems="center" spacing={2}>
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
                        <Grid item>
                            <FormControl>
                                <InputLabel htmlFor="energy">{ date ? `Energy usage on ${date}` : "Energy usage"}</InputLabel>    
                                <Input
                                    id="energy"
                                    placeholder="your energy consumption"
                                    type="number"
                                    required
                                    value={energyConsumption}
                                    onChange={handleEnergyConsumptionChange}
                                    inputProps={{ min: 0, step: 0.0001 }}
                                    ref={energyInput}
                                    fullWidth
                                    />
                                <FormHelperText>Enter your energy consumption per day in mwh</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <Button type="submit" variant="contained" color="primary">Submit</Button>
                        </Grid>
                </Grid>   
            </Grid>
        </form> 
    )
}

export default UsageForm;
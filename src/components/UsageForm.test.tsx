import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import UsageForm from './UsageForm';

test('does not call onSubmit when data is incomplete', () => {
    const onSubmit = jest.fn()
    render(<UsageForm onSubmit={onSubmit}/>);

    const submitButton = screen.getByText(/submit/i);
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);

    expect(onSubmit).toHaveBeenCalledTimes(0)
});

test('calls onSubmit when data is incomplete', () => {
    const onSubmit = jest.fn()
    render(<UsageForm onSubmit={onSubmit}/>);
    
    expect(screen.queryAllByText(/USA/)).toHaveLength(0);


    // open the select and select a country from the dropdown
    // MaterialUI does not use a native select component, so selecting a value is a little more complex
    const select = screen.getByLabelText(/Location/i);
    fireEvent.mouseDown(select);
    const listbox = within(screen.getByRole('listbox'));
    fireEvent.click(listbox.getByText(/USA/i));
    expect(screen.getAllByText(/USA/)).not.toHaveLength(0);


    // set a date from the date input
    const dateInput = screen.getByLabelText(/Date/);
    fireEvent.change(dateInput, { target: { value: '2020-01-01' } })
    // validate that the help text for the location input has changed
    expect(screen.getByText(/You can't change the location /i)).toBeInTheDocument();

    // set the energy usage
    const energyInput = screen.getByLabelText(/Energy usage/);
    fireEvent.change(energyInput, { target: { value: '0.004' } })
    expect(screen.getByDisplayValue(/0.004/i)).toBeInTheDocument();


    // click submit
    const submitButton = screen.getByText(/submit/i);
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);

    // validate that the onSubmit handler has been called
    expect(onSubmit).toHaveBeenCalledTimes(1)
    // validate that the energy input has been cleared
    expect(screen.queryByDisplayValue(/0.004/i)).toBeNull();
    // validate that the date input has been updated to the next day
    expect(screen.getByDisplayValue(/2020-01-02/i)).toBeInTheDocument();

});
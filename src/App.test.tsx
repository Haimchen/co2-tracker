import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import App from './App';

test('renders title', () => {
  render(<App />);
  const title = screen.getByText(/tracker/i);
  expect(title).toBeInTheDocument();
});

test('does not render the chart when no data was entered', () => {
  render(<App />);
  const chartLabel = screen.queryAllByText(/CO2 emissions in kg/i);
  expect(chartLabel).toHaveLength(0);
});

// TODO add a mock for the API and add a test case to verify the chart is shown after data was entered
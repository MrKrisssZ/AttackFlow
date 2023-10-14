import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';
import { AuthContextProvider } from './context/AuthContext';
import { ReportsContextProvider } from './context/ReportsContext';

const customRender = (ui) => {
  return render(
    <React.StrictMode>
      <AuthContextProvider>
        <ReportsContextProvider>
          {ui}
        </ReportsContextProvider>
      </AuthContextProvider>
    </React.StrictMode>
  );
};



// check header before log in
test('when users are not log in, show attack flow in the header', () => {
  customRender(<App />);
  const linkElement = screen.getByText(/attack flow/i);
  expect(linkElement).toBeInTheDocument();
});

test('when users are not log in, show annotation in the header', () => {
  customRender(<App />);
  const linkElement = screen.getByText(/annotation/i);
  expect(linkElement).toBeInTheDocument();
});

test('when users are not log in, show visualization in the header', () => {
  customRender(<App />);
  const linkElement = screen.getByText(/visualization/i);
  expect(linkElement).toBeInTheDocument();
});

test('when users are not log in, do not show report in the header', () => {
  customRender(<App />);
  const linkElement = screen.queryByText(/reoprt/i);
  expect(linkElement).toBeNull();
});
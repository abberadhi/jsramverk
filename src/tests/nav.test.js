import { render, fireEvent, screen, queryByAttribute, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'

import App from "../App";

test('check that navigation loads ', async () => {
    render(<App />);

    await waitFor(() => screen.getByRole('navigation'))
    let navItems = screen.getAllByRole('listitem');
    expect(navItems).toHaveLength(2);
});

test('check that nav buttons redirect ', async () => {
  render(<App />);

  await waitFor(() => screen.getByRole('navigation'))

  let navItems = screen.getAllByRole('listitem');
  expect(navItems).toHaveLength(2);
  expect(navItems[0]).toBeInTheDocument();

  fireEvent.click(screen.getByTestId("add-link"));
  let route = window.location.href.split('/').pop();
  expect(route).toBe("create");

  fireEvent.click(screen.getByTestId("docs-link"));
  route = window.location.href.split('/').pop();
  expect(route).toBe("")
});
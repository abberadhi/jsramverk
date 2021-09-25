import { render, fireEvent, screen, queryByAttribute, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom'

import App from "../App";

jest.setTimeout(20000)

test('check that nav buttons redirect ', async () => {
  render(<App />);

  // wait for navigation to load
  await waitFor(() => screen.getByRole('navigation'))

  // check that all items have loaded
  let navItems = screen.getAllByRole('listitem');
  expect(navItems).toHaveLength(2);
  expect(navItems[0]).toBeInTheDocument();

  // check that first item redirects to /create
  fireEvent.click(screen.getByTestId("add-link"));
  let route = window.location.href.split('/').pop();
  expect(route).toBe("create");


  fireEvent.click(screen.getByTestId("docs-link"));
  route = window.location.href.split('/').pop();
  expect(route).toBe("");
});

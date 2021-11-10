import { render, fireEvent, screen, queryByAttribute, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom'
import 'jest-canvas-mock';

import App from "../App";

jest.setTimeout(20000)

test('check code editor works', async () => {
  render(<App />);
  let text = screen.getAllByRole('textbox')
  let pass = screen.getByTestId("psw");
  let button = screen.getAllByRole('button')

  // wait for navigation to load
  await waitFor(() => text)
  
  expect(text[0]).toBeInTheDocument()

  fireEvent.change(text[0], {target: {value: 'abbe@abbe.dev'}});
  fireEvent.change(pass, {target: {value: 'abbe'}});

  fireEvent.click(screen.getByRole('button'));

  await waitFor(() => {
    expect(screen.getByText('Documents')).toBeInTheDocument()
  })

  let route = window.location.href.split('/').pop();
  expect(route).toBe("");

  await waitForElementToBeRemoved( () => screen.getByTestId('loading'), {timeout: 40000} );

  let childrenBefore = screen.getByTestId('documents-table').childElementCount;

  // enter route for creating new documents
  fireEvent.click(screen.getByTestId("add-document"));
  route = window.location.href.split('/').pop();
  expect(route).toBe("createdocument");

  // wait to be redirected again
  await waitFor(() => {
    expect(window.location.href.split('/').pop() != "createcode").toEqual(true);
  }, {timeout: 40000});


  await waitFor(() => {
    expect(screen.getByTestId("actionBtn")).toBeInTheDocument();
    expect(screen.getByTestId("actionBtn")).toHaveTextContent('PDF')
  });
});

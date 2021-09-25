import React from 'react';
import { render, fireEvent, screen, cleanup, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom'
import axios from 'axios'
import App from "../App";

axios.defaults.baseURL = 'https://jsramverk-editor-abra19.azurewebsites.net';

jest.setTimeout(40000)

afterEach(cleanup);

test('checking that deleting document is successful', async () => {
    // will load documents table
    render(<App />);

    // waiting for fetch to end
    await waitFor(() => expect(screen.getByTestId('documents-table')).toBeInTheDocument(), {timeout: 40000}); 


    // save amount of loaded documents
    let childrenBefore = screen.getByTestId('documents-table').children.length;

    // get button
    let rows = screen.getByTestId('documents-table').children[childrenBefore - 1];
    let col = rows.children[3];
    let button = col.children[0];

    fireEvent.click(button);
  
    let childrenAfter = screen.getByTestId('documents-table').children.length;

    // expect amount of documents to increase
    expect(childrenBefore > childrenAfter).toEqual(true);

    // remove added children
});

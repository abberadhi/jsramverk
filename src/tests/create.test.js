import React from 'react';
import { render, fireEvent, screen, cleanup, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom'
import axios from 'axios'
import App from "../App";

axios.defaults.baseURL = 'https://jsramverk-editor-abra19.azurewebsites.net';

jest.setTimeout(40000)

afterEach(cleanup);

test('checking that creating document is successful', async () => {
    // will load documents table
    render(<App />);

    // waiting for fetch to end
    await waitFor(() => expect(screen.getByTestId('documents-table')).toBeInTheDocument(), {timeout: 40000}); 

    // save amount of loaded documents
    let childrenBefore = screen.getByTestId('documents-table').childElementCount;

    // enter route for creating new documents
    fireEvent.click(screen.getByTestId("add-link"));

    // wait to be redirected
    await waitFor(() => {
      expect(window.location.href.split('/').pop() == "create").toEqual(true);
    }, {timeout: 40000});

    // wait to be redirected again
    await waitFor(() => {
      expect(window.location.href.split('/').pop() != "create").toEqual(true);
    }, {timeout: 40000});

    // wait for document to load
    await waitForElementToBeRemoved( () => screen.getByTestId('loading'), {timeout: 40000} );

    // load documents table
    fireEvent.click(screen.getByTestId("docs-link"));

    // waiting for fetch to end
    await waitFor(() => expect(screen.getByTestId('documents-table')).toBeInTheDocument(), {timeout: 40000}); 
  
    let childrenAfter = screen.getByTestId('documents-table').childElementCount;

    // expect amount of documents to increase
    expect(childrenBefore < childrenAfter).toEqual(true);
});

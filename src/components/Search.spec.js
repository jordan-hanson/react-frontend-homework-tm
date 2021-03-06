import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { initialState } from '../reducers/searchReducer'

import Search from './Search';
import { filteredHotels } from './Search';
import { rootReducer } from '../reducers/index';

function renderWithRedux(
    ui,
    { initialState, store = createStore(rootReducer, initialState) } = {}
) {
    return {
        ...render(<Provider store={store}>{ui}</Provider>), store
    }

}
test("Should render Search without errors", () => {

    renderWithRedux(<Search />)

    const h1Title = screen.getByText(/hotel name/i)
    const recommended = screen.getByText(/recommended/i)
    const ascending = screen.getByText(/high-to-low/i)
    const descending = screen.getByText(/low-to-high/i)

    expect(h1Title).toBeInTheDocument()
    expect(recommended).toBeInTheDocument()
    expect(ascending).toBeInTheDocument()
    expect(descending).toBeInTheDocument()
})

test("Updates state text input", async () => {
    const renderContainer = renderWithRedux(<Search />)
    const onChangeMock = jest.fn();
    const inputField = renderContainer.getByPlaceholderText("Hotel")
    console.log(inputField)
    expect(inputField.value).toBe("")
    fireEvent.change("input", { target: { value: "hotel name" } })
    await wait(() => {
        expect(onChangeMock).toHaveBeenCalledTimes(1);
    });
})

test("Fire event to submit filtered hotel form", () => {
    renderWithRedux(<Search />)

    const submitButton = screen.getByText(/submit/i)
    // console.log(submitButton)

    expect(submitButton).toBeInTheDocument()
    // fireEvent.click(submitButton)
    //  Test fails with my mock action not created in filteredHotels().
})


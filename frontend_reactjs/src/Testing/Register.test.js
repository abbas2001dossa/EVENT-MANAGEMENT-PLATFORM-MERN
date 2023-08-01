import {render, fireEvent ,screen , cleanup} from '@testing-library/react';
import Register from '../components/Register';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import React from 'react';import { act } from 'react-dom/test-utils'; 

jest.mock('axios', () => ({
    post: jest.fn(),
  }));


test(' Checking if all inputs are storing values and updating its relative states',()=>{

    render(<MemoryRouter><Register></Register></MemoryRouter>);
    const usernameInput = screen.getByLabelText('Your username');
    const passwordInput = screen.getByLabelText('Password');
    const repasswordInput = screen.getByLabelText('Repeat your password');

    // Simulate user input
    fireEvent.change(usernameInput, { target: { value: 'abbasdossa' } });
    fireEvent.change(passwordInput, { target: { value: 'fast1234' } });
    fireEvent.change(repasswordInput, { target: { value: 'fast1234' } });

    // Check if the component's state has been updated correctly
    expect(usernameInput.value).toBe('abbasdossa');
    expect(passwordInput.value).toBe('fast1234');
    expect(repasswordInput.value).toBe('fast1234');
});


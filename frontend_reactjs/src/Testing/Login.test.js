import {render, fireEvent ,act,screen , cleanup} from '@testing-library/react';
import { MemoryRouter,Router , Routes , Route } from 'react-router-dom';
import React from 'react';
import {createMemoryHistory} from "history";
import UserEvent from '@testing-library/user-event';
import Login from '../components/Login';

test('Checking input values' , ()=>{

    render(<MemoryRouter><Login></Login></MemoryRouter>);
    const usernameInput = screen.getByRole('textbox', { name: /username/i });
  const passwordInput = screen.getByRole('textbox', { name: /password/i });
 
    fireEvent.change(usernameInput, { target: { value: 'testuser@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
      
    expect(usernameInput.value).toBe('testuser@example.com');
    expect(passwordInput.value).toBe('testpassword');

});



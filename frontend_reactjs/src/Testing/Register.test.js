import {render, fireEvent ,act,screen , cleanup} from '@testing-library/react';
import Register from '../components/Register';
import { MemoryRouter,Router , Routes , Route } from 'react-router-dom';
import React from 'react';
import {createMemoryHistory} from "history";
import UserEvent from '@testing-library/user-event';
import AlertMessage from '../components/AlertMessage';

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



describe("postReq", () => {
  it("Should create post when valid username and passwords are inputted", async () => {
    await act(async () => {
      const history = createMemoryHistory();
      act(() => {
      render(
        <MemoryRouter history={history}>
          <Register></Register>
        </MemoryRouter>
      );
      });
    });
    const usernameInput = screen.getByLabelText('Your username');
    const passwordInput = screen.getByLabelText('Password');
    const repasswordInput = screen.getByLabelText('Repeat your password');
    UserEvent.type(usernameInput , "Ahmad Khokar");
    UserEvent.type(passwordInput, "wassup");
    UserEvent.type(repasswordInput, "wassup");
    
    const RegisterButton = screen.getByTestId('registerbtn');
    UserEvent.click(RegisterButton);
    
    const alertMessage = screen.getByTestId('alert-message');
    expect(alertMessage).toBeInTheDocument();
  });
});



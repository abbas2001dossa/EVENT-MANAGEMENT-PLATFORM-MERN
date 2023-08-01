import {render, fireEvent ,screen , cleanup} from '@testing-library/react';
import NavbarPro from '../components/NavbarPro';
import { MemoryRouter } from 'react-router-dom'; 
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';


// mock api response generating 
const mock = new MockAdapter(axios);
mock.onPost('http://127.0.0.1:8000/logout').reply(200, {
  message: 'logoutSuccess',
});
const mockUsername = 'abbasdossa';

afterEach(cleanup);



test('NavbarPro renders without crashing', () => {
    render(
        <MemoryRouter>
          <NavbarPro />
        </MemoryRouter>
      );
});



test('NavbarPro contains <img> element with src="av.png"', () => {
    const { container } = 
    render
    (
        <MemoryRouter>
            <NavbarPro />
        </MemoryRouter>
    );

    const imgElement = container.querySelector('img[src="av.png"]');
    expect(imgElement).toBeInTheDocument();
});


test('logout button sends request to backend server and receives a response', async () => {
    
    
    render( <MemoryRouter><NavbarPro username={mockUsername}></NavbarPro></MemoryRouter>);
  
    // Simulate a click on the logout button
    fireEvent.click(screen.getByText('Log Out'));
  
    // Wait for the axios request to be handled
    await new Promise((resolve) => setTimeout(resolve, 0));
  
    // Assert that the request was sent
    expect(mock.history.post.length).toBe(1);
    expect(mock.history.post[0].url).toBe('http://127.0.0.1:8000/logout');
  
    
  });




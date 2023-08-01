import {render,screen , cleanup} from '@testing-library/react';
import AlertMessage from '../components/AlertMessage';

test('AlertMessage renders without errors', () => {
    render(<AlertMessage message="Test message" severity="success" />);
  });


  
  
  test('success props', () => {
    render(
        <AlertMessage message={"Welcome to Login Page"} severity={"success"} />
    );
  
    const message = screen.getByText('Welcome to Login Page');
      
  
    expect(message).toBeInTheDocument();
  });


  




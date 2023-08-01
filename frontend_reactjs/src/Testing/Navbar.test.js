import {render,screen , cleanup} from '@testing-library/react';
import Navbar from '../components/Navbar';

// sample test
test(' example test' , ()=>{
    expect(true).toBe(true);
})

test(' Checking if Navbar diplays the proper links' ,()=>{

    render(<Navbar></Navbar>);
    
    const homeLink = screen.getByText('Home');
    const aboutLink = screen.getByText('Link');
    const contactLink = screen.getByText('Dropdown');

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();


    

});

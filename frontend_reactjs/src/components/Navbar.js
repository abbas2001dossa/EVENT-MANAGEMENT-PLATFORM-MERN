import React from 'react';

function Navbar() {

    const myStyle ={
        marginLeft : '650px'  
    }

    const ma = {
        fontSize :'20px',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        fontWeight : 'bolder'
    }


  return (
    <>

        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-lg">
        <a className="navbar-brand ml-5 " style={ma}  > <b> ATTENDIFY  </b> </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse ml-5" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
                <a className="nav-link"  >Home <span className="sr-only"></span></a>
            </li>
            <li className="nav-item">
                <a className="nav-link"  >Link</a>
            </li>
            <li className="nav-item">
                <a className="nav-link"  >Dropdown</a>
            </li>
            </ul>
            <form className="form-inline my-2 my-lg-0 d-flex flex-row ml-5" style={myStyle}>
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success my-2 my-sm-0 ml-4" type="submit">Search</button>
            </form>
        </div>
        </nav>
    
    </>
  );
}

export default Navbar;

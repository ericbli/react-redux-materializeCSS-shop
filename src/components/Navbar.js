import React from 'react';
import { Link } from 'react-router-dom'
 const Navbar = ()=>{
    return(
            <nav className="nav-wrapper">
                <div className="container">
                    <Link to="/" className="brand-logo">React_Shopping

</Link>

                    <ul className="right">
                        <li><Link to="/">Shop</Link></li>
                        <li><Link to="/cart"> Cart detail</Link></li>
                        <li><Link to="/cart"><i className="large material-icons ">shopping_cart</i></Link></li>
                      
                    </ul>
                </div>
            </nav>
   
        
    )
}

export default Navbar;
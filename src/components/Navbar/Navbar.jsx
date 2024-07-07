import React , {useContext} from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { CoinContext } from '../../context/CoinContext';
import { Link } from 'react-router-dom';


const Navbar = () => {
  const {setCurrency} = useContext(CoinContext);

  const handelSelect = (currency) =>{
    const currencyMap = {
      USD: { name: 'usd', symbol: '$' },
      EUR: { name: 'eur', symbol: '€' },
      INR: { name: 'inr', symbol: '₹' },
    };
    setCurrency(currencyMap[currency]);
  }

  return (
    <div className='navbar'>
        <div className="navbar-brand">
          <Link to={'/'}>
            <img src={logo} alt="logo" className="navbar-logo" />
          </Link>
            CoinWatch
        </div>
      <ul className="navbar-links">
      <Link to={'/'}> <li>Home</li></Link>
        <li>Features</li>
        <li>Pricing</li>
        <li><a href="https://www.linkedin.com/in/kunal-kaushik-981220221/">Contact</a></li>
      </ul>

    <Dropdown onSelect={handelSelect}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
            CURRENCY
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item eventKey="USD">USD</Dropdown.Item>
          <Dropdown.Item eventKey="EUR">EUR</Dropdown.Item>
          <Dropdown.Item eventKey="INR">INR</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>

    {/* <Button variant="primary">Sign Up</Button> */}
    </div>
  )
}

export default Navbar

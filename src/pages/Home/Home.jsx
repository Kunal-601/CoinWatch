// src/components/Home.jsx
import { useContext, useEffect, useState } from 'react';
import './Home.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { CoinContext } from '../../context/CoinContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState('');

  const inputHandler = (event) => {
    setInput(event.target.value);

    if (event.target.value === '') {
      setDisplayCoin(allCoin);
    }
  };

  const searchHandler = async (event) => {
    event.preventDefault();
    const searchResult = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });

    setDisplayCoin(searchResult);
  };

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  return (
    <div className='home'>
      <div className='hero'>
        <h1 className='home-title'>Largest <br /> Crypto Marketplace</h1>
        <Form onSubmit={searchHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control 
              type="text" 
              placeholder="Enter Coin Name"
              value={input}
              onChange={inputHandler} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
      <div className="crypto-table">
        <div className="table-layout header">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: 'center'  }}>24H Change</p>
          <p className="market-cap">Market Cap</p>
        </div>
        {
          displayCoin.slice(0, 10).map((item, index) => (
            <Link to={`/coin/${item.id}`} className='table-layout' key={index}>
              <p>{item.market_cap_rank}</p>
              <div className="coin-info">
                <img src={item.image} alt={item.symbol} className="small-image" />
                <p>{item.name + ' - ' + item.symbol}</p>
              </div>
              <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
              <p className={item.price_change_percentage_24h > 0 ? 'green' : 'red'}>
                {Math.floor(item.price_change_percentage_24h * 100) / 100}%
              </p>
              <p className="market-cap">
                {currency.symbol} {item.market_cap.toLocaleString()}
              </p>
            </Link>
          ))
        }
      </div>
    </div>
  );
}

export default Home;

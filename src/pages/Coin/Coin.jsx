import React, { useContext, useEffect, useState } from 'react';
import './Coin.css';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../../context/CoinContext';
import Spinner from 'react-bootstrap/Spinner';
import LineChart from '../../components/LineChart/LineChart';

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [historicalData, setHistoricalData] = useState();
  const [loading, setLoading] = useState(true);
  const { currency } = useContext(CoinContext);
  const [days, setDays] = useState(10);

  // Fetch the data of a coin from its id
  const fetchCoinData = async () => {
    setLoading(true);
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-ZNQX6e2fjq8Qx3tACEf9gSjB'
      }
    };

    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options);
      const data = await response.json();
      setCoinData(data);
    } catch (err) {
      console.error('Fetch coin data error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchHistoricalData = async () => {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': 'CG-ZNQX6e2fjq8Qx3tACEf9gSjB'
        }
      };
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=${days}&interval=daily`, options);
      if (!response.ok) {
        throw new Error('Failed to fetch historical data');
      }
      const data = await response.json();
      const formattedData = data.prices.map(item => [new Date(item[0]), item[1]]);
      // console.log(data); //Remove after
      setHistoricalData(formattedData);
    } catch (error) {
      console.error('Error fetching historical data:', error);
    }
  };


  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [coinId, currency, days]);

  if (loading) {
    return (
    <div className='loading'>
      <Spinner animation="grow" variant="primary" />
      <Spinner animation="grow" variant="secondary" />
      <Spinner animation="grow" variant="success" />
      <Spinner animation="grow" variant="danger" />
      <Spinner animation="grow" variant="warning" />
      <Spinner animation="grow" variant="info" />
      <Spinner animation="grow" variant="light" />
      <Spinner animation="grow" variant="dark" />
    </div>
  )
}

if (!coinData || !historicalData) {
  return <div className='error'>Error loading coin data</div>;
}

  return (
    <div className="coin-container">
      <div className="coin-header">
        <h1>{coinData.name}</h1>
      </div>
      <div>
        <img src={coinData.image?.large} alt={coinData.name} className="coin-image" />
        <p>
          <b>
            {coinData.name} ({coinData.symbol?.toUpperCase()})
          </b>
        </p>
        <div className="coin-chart">
          <div className="select-days">
            <label>Select graph duration:</label>
            <select value={days} onChange={(e) => setDays(parseInt(e.target.value))}>
              <option value={10}>10 Days</option>
              <option value={30}>1 Month</option>
              <option value={180}>6 Months</option>
            </select>
          </div>
          <LineChart historicalData={historicalData} />
        </div>
        <div className="coin-info">
          <ul>
            <li>Crypto Market Rank</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Current Price</li>
            <li>
              {currency.symbol}{' '}
              {coinData.market_data?.current_price[currency.name]?.toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>Market Cap</li>
            <li>
              {currency.symbol}{' '}
              {coinData.market_data?.market_cap[currency.name]?.toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24 Hour High</li>
            <li>
              {currency.symbol}{' '}
              {coinData.market_data?.high_24h[currency.name]?.toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24 Hour Low</li>
            <li>
              {currency.symbol}{' '}
              {coinData.market_data?.low_24h[currency.name]?.toLocaleString()}
            </li>
          </ul>
        </div>
      </div>
      {/* <div>
        {historicalData.length > 0 && <LineChart historicalData={historicalData} />}
      </div> */}
    </div>
  );
};

export default Coin;

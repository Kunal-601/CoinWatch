import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import CoinContextProvider from './context/CoinContext.jsx'
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns'; // Import the date-fns adapter
Chart.register(...registerables);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>
  <CoinContextProvider>
    <App />
  </CoinContextProvider>
  </BrowserRouter>
  </React.StrictMode>,
)

import Navbar from "./components/Navbar/Navbar"
{
  /* The following line can be included in your src/index.js or App.js file */
}
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from 'react-router-dom'
import Home from "./pages/Home/Home"
import Coin from "./pages/Coin/Coin"
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <div className="app-container">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/coin/:coinId" element={<Coin/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App

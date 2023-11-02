
import './App.css';
import {useState} from 'react'

const API_KEY="b5f1abc2aff6b8b2bd19281512e82efa";



function App() {

  const [city,setCity]=useState("");
  const [data,setData]=useState(null);
  const[error,setError]=useState('');

  async function fetchData(){
try{
  const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
  if(response.ok){
  const weatherData = await response.json();
  console.log(weatherData);
  setData(weatherData);
  setError("");
  }
  else{
    setError("Not a city name");
    setData(null);
  }
}
catch(err){
setError("Please enter the city name correctly");
setData(null);
}
  }
  return (
    <div className="App">
      <h1>
        Weather App
      </h1>
      <div>
      <input type="text" value={city} placeholder="Enter the city name here...." onChange={e=>setCity(e.target.value)}/>
      <button type="submit" onClick={fetchData}>Fetch</button>    
      </div>

      <div className='container'>
        
        {data &&(
          <div className='result-box'>
          <p className='city-name'>{data.name},{data.sys.country}</p>
          <p>{Math.round(data.main.temp-273.15)}°C</p>
          <p className='clouds'>{data.weather[0].main}</p>
          </div>
        )}
        <p>{error}</p>
      </div>
    </div>
  );
}

export default App;

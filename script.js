const cityinput = document.getElementById('city-input');
const searchbtn = document.getElementById('search-btn');
const weatherresult = document.getElementById('weather-result');
const cityname = document.getElementById('city-name');
const localtime = document.getElementById('local-time');
const weathericon = document.getElementById('weather-icon')
const temperature = document.getElementById('temperature');
const condition = document.getElementById('condition');
const feelslike = document.getElementById('feels-like');
const humidity = document.getElementById('humidity');
const windspeed = document.getElementById('wind-speed');
const pressure = document.getElementById('pressure');
const visibility = document.getElementById('visibility');
const uvindex = document.getElementById('uv-index');
const errormessage = document.getElementById('error-message')

const apiKei = "43570e5358224a47b0c201843251308";

async function busCity(city) {
  try{

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKei}&q=${city}&aqi=no&lang=pt`;
    const response = await fetch(url);

    if (!response.ok){

      throw new Error ('Cidade não encontrada! ');

    }

    const data = await response.json();
    
    renderWeatherCard(data);
  
  } catch (erro) {

 renderWeatherError(erro.message);
 
  }
  
}
  function renderWeatherCard(data){

    weatherresult.classList.remove('hidden');
    errormessage.classList.add('hidden');

    cityname.textContent = data.location.name;
    localtime.textContent = data.location.localtime;
    temperature.textContent = data.current.temp_c + "°C";
    condition.textContent = data.current.condition.text;
    weathericon.src = "https:" + data.current.condition.icon;
    feelslike.textContent = data.current.feelslike_c + "°C";
    humidity.textContent = data.current.humidity + "%"
    windspeed.textContent = data.current.wind_kph + "km/h";
    pressure.textContent = data.current.pressure_mb + "hPa";
    visibility.textContent = data.current.vis_km + "km";
    uvindex.textContent = data.current.uv;

  }

  function renderWeatherError(message){
    weatherresult.classList.add('hidden');
    errormessage.classList.remove('hidden');
    errormessage.querySelector('p').textContent = message;
  }

  searchbtn.addEventListener('click', () => {

    const city = cityinput.value.trim();

    if(city) busCity(city);
    else renderWeatherError('Por favor, digite o nome da cidade. ');

  });

  cityinput.addEventListener('keypress', (event) => {

    if(event.key === 'Enter') searchbtn.click();

  });
const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');

const days = ['Sunday','Monday','Tuesday','Wedday','Thursday','Friday','Saturday'];
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const api_key = 'd882067d4d5fd0fc3d2e2d18b9a0e9f0';

setInterval(function(){
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hours12 = hour>=13 ?hour%12:hour;
    const min = time.getMinutes();
    const min2 = min<=9 ?`0${min}`:min;
    const ampm = hour>=12 ?'PM':'AM';

    timeEl.innerHTML = hours12+":"+min2+`<span id="am-pm">${ampm}</span>`;
    dateEl.innerHTML = days[day]+','+date+' '+months[month];
},1000);


 function showWeatherData(data){
    let temp = data.current_weather.temperature;
    let ws = data.current_weather.windspeed; 
    currentWeatherItemsEl.innerHTML = 
    `<div class="weather-items">
        <div>Temperature</div>
        <div>${temp}&degC</div>
    </div>
    <div class="weather-items">
        <div>wind speed</div>
        <div>${ws}</div>
    </div>`;
 }

function getWeatherData(){
    navigator.geolocation.getCurrentPosition((success)=>{
        console.log('succes');

        let {latitude,longitude} = success.coords;

        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,windspeed_10m_max&current_weather=true&timezone=auto&forecast_days=3`).then(res=>res.json()).then(data=>{
            console.log(data);
            showWeatherData(data);
        });
    })
}

getWeatherData();

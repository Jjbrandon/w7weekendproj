const dateel = document.getElementById('date');
const currenttemp = document.getElementById('currenttemp')
const currenticon = document.getElementById('currenticon')
const timeel = document.getElementById('currenttime')
const forecast = document.getElementById('weeklyforecast')

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const APIKEY = `652102f9ed2f959db1c0714e1f962f55`

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date =time.getDate();
    const day = time.getDay();
    const hour= time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'


    timeel.innerHTML= hoursIn12HrFormat + ':' + minutes + ' ' + `<span id="am-pm"> ${ampm} </span>`

    dateel.innerHTML= days[day] + ', ' + months[month] + ' ' + date


    
}, 1000);





const getWeatherData = async () => {
    navigator.geolocation.getCurrentPosition ( async (success) => {

        let {latitude, longitude } = success.coords;

        const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly, minutely&units=imperial&appid=${APIKEY}`
        const res = await fetch(url);
        if(res.status == 404){
            return
        }
    
    
        const data = await res.json();
        console.log(data)
        showWeatherData(data);

        
        document.getElementById('currenticon').setAttribute('src', data.current.weather[0].icon)
        let otherDayForecast = ''

data.daily.forEach( async (day, idx) => {
    if(idx == 0){

    }else{
        otherDayForecast += `
        <div class="col col-5">
              <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
              <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}
              <p id="wtemp">${day.temp.day}</p>
              <div id="ntemp">${day.temp.night}</div>
              <p id="whumid">${day.humidity}</p>
              <p id="wsunrise">${window.moment(day.sunrise * 1000).format('HH:MM a')}</p>
              <p id="wsunset">${window.moment(day.sunset * 1000).format('HH:MM a')}</p>
            </div>
        `
    }


    forecast.innerHTML = otherDayForecast;
})
    })

    }


getWeatherData()

function showWeatherData(data){

    let {temp,humidity,sunrise,sunset,wind_speed} = data.current
    document.getElementById('currenttemp').innerHTML = temp + ' Fahrenheit'
    document.getElementById('currenthumidity').innerHTML = humidity
    document.getElementById('wind_speed').innerHTML = wind_speed
    document.getElementById('sunrisetime').innerHTML = window.moment(sunrise * 1000).format('HH:MM a')
    document.getElementById('sunsettime').innerHTML = window.moment(sunset * 1000).format('HH:MM a')

}






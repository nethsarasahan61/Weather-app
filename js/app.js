console.log("hello js");
let city;
function searchCityOnClick(){
    city=document.getElementById("search-bar").value
    const baseUrl = "http://api.weatherapi.com/v1"
    const key = "6aa42a34e3794aee8cc105256261210"
    fetch(`${baseUrl}/forecast.json?key=${key}&q=${city}&days=7`).then(res=>res.json()).then(data=>{
        const hours = data.forecast.forecastday[0].hour;

        const now = new Date().getHours();

        const nextHours = hours.filter(hour => {
            return new Date(hour.time).getHours() >= now;
        }).slice(0, 5);

        nextHours.forEach(hour => {
            if(hour.time.substring(11,13)==now){
                console.log("NOW");
            }else{
                console.log(hour.time.substring(11,13)-12,"PM");
            }
            console.log(hour.temp_c);
            console.log(hour.condition.text);
            console.log(hour.condition.icon);            
});
    })
    fetch(`${baseUrl}/current.json?key=${key}&q=${city}`).then(res=>res.json()).then(data=>{
        let img=getWeatherIcon(data.current.condition.text)
        const date = new Date(data.current.last_updated.substring(0,10) + "T00:00:00");
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        document.getElementById("c-main").innerHTML=`
            <center>
                <div class="small-card" style="margin: 20px;">
                    <div style="display: inline-flex; margin: 0; padding: 10px;">
                        <img class="l-img" src="/components/imgs/location.svg" alt="">
                        <p class="l-city">${data.location.name},${data.location.country}</p>
                    </div>
                </div>
            </center>
            <center><p id="day">${dayName} · CURRENT WEATHER</p></center>
            <div style="display: flex; justify-content: center;">
                <div class="info-panel" id="info-p">                                
                    <div style="display: inline-block;">
                        <center>
                            <p class="info-p-h5">${data.current.temp_c}°C</p>
                            <p class="info-p-h5 date-size">${data.current.condition.text}</p>
                            <p class="info-p-h6">Feels Like ${data.current.feelslike_c}°C</p>
                        </center>
                    </div>
                    <br><br>
                </div>            
                <div class="img-panel" style="justify-items: flex-end; align-items: center; padding-left: 100px;">
                    <img src="${img}" alt="" class="card-image" id="c-img">
                </div>
            </div>
            <hr style="width: 98%;">
            <div class="mini-c">
                <div class="cards">
                    <center>
                        <div style="display: flex; align-items: center; justify-content:center;">
                            <img src="/components/imgs/humidity.svg" alt="" style="width: 18px; padding-right: 5px">
                            <p class="att">Humidity</p>
                        </div>
                        <p class="att">${data.current.humidity}%</p>
                    </center>
                </div>
                <div class="cards">
                    <center>
                        <div style="display: flex; align-items: center; justify-content:center;">
                            <img src="/components/imgs/wind.svg" alt="" style="width: 18px; padding-right: 5px;">
                            <p class="att">Wind Speed</p>
                        </div>                        
                        <p class="att">${data.current.wind_kph}km/h</p>
                    </center>
                </div>
                <div class="cards">
                    <center>
                        <div style="display: flex; align-items: center; justify-content:center;">
                            <img src="components/imgs/rain.svg" alt="" style="width: 18px; padding-right: 5px;">
                            <p class="att">Chance of Rain</p>
                        </div>
                        <p class="att">${data.current.chance_of_rain}%</p>
                    </center>
                </div>
            </div>
        `                                
        console.log(data);        

})
}
function getWeatherIcon(text) {
    text=text.toUpperCase()
    let c;
    if(text.includes("RAIN")) {
        c="/components/imgs/rainy.svg";        
    }else if (text.includes("CLOUDY")) {
        c="/components/imgs/cloudy.svg";
    }else if (text.includes("SUNNY")) {
        c="/components/imgs/sunny.svg";
    }else if (text.includes("THUNDER")) {
        c="/components/imgs/thunder.svg";
    }else if (text.includes("OVERCAST")) {
        c="/components/imgs/overcast.svg";        
    }
    return c;
}
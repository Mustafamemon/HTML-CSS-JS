var color = ["#87ceeb", "#92BAD2", "#d7e3e1", "#fffafa" , '$FFD700',];
var weather = ["clear", "clouds", "rain mist smoke haze dust fog sand ash squall tornado", "snow" , 'sunny',];

function daysData() {
  var val = document.getElementById("myCities").value;
  var index = x.findIndex((item) => item.name === val);
  var cityId = x[index]["id"];
  var colorCode = ''
 var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  let url = `https://api.openweathermap.org/data/2.5/forecast/daily?id=${cityId}&appid=585e670f55ee9b114fa2f1f2731177d9&units=imperial`;

  fetch(url, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      let markup = new Array();

      result["list"].map((item, index) => {
        weather.map((item1, index1) => {
          if (item1.includes(item.weather[0].main.toLowerCase())){
            colorCode = color[index1]
            
          }
        })
        
        var daydate = timeConverter(item.dt);
        var day = daydate.split(";")[1];
        var date = daydate.split(";")[0];
        html = `
            <div key =${index} class="carousel-item col-12 col-sm-6 col-md-4 col-lg-3 ${
          index === 0 ? "active" : null
        }">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">${day}</h3>
                <h3 class="card-title">${date}</h3>
              </div>

            <div style="background-color:${colorCode}">
            <div class="text-center mb-4">
            <div style="padding:10px;">
            <div class='weather-icon-wrapper'>
              <img src="http://openweathermap.org/img/wn/${
                item.weather[0].icon
              }@2x.png" alt="image not found">
            </div>
            </div>
              <h4 style="font-weight: 400;">${item.weather[0].main}</h4>

              <div>
                <span>High : ${item.temp.max}°F</span>
              </div>
              <div>
                <span>Low : ${item.temp.min}°F</span>
              </div>
              <div>
                <span>Humidity : ${item.humidity}%</span>
              </div>
            </div>
          </div>
          </div>
            </div>
          </div>`;
        markup.push(html);
        html = markup.join("");
      });

      document.getElementById("weatherData").innerHTML = html;
    })
    .catch((error) => console.log("error", error));
}
function hourlyData() {
  var val = document.getElementById("myCities").value;
  var index = x.findIndex((item) => item.name === val);
  var cityId = x[index]["id"];
  var colorCode = ''

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  let url = `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=83ad5d50272715816586460afb935013&units=imperial`;

  fetch(url, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      let markup = new Array();

      result["list"].map((item, index) => {
        weather.map((item1, index1) => {
          if (item1.includes(item.weather[0].main.toLowerCase())){
            colorCode = color[index1]
            
          }
        })
        
        var daydatetime = timeConverter(item.dt);
        var day = daydatetime.split(";")[1];
        var date = daydatetime.split(";")[0];
        var time = daydatetime.split(";")[2];
        html = `
          <div key =${index} class="carousel-item col-12 col-sm-6 col-md-4 col-lg-3 ${
          index === 0 ? "active" : null
        }">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">${day}</h3>
              <h3 class="card-title">${date + " " + time}</h3>
            </div>

            <div style="background-color:${colorCode}">
          <div class="text-center mb-4">
          <div style="padding:10px;">
          <div class='weather-icon-wrapper'>
            <img src="http://openweathermap.org/img/wn/${
              item.weather[0].icon
            }@2x.png" alt="image not found">
          </div>
          </div>
            <h4 style="font-weight: 400;">${item.weather[0].main}</h4>

            <div>
              <span>High : ${item.main.temp_max}°F</span>
            </div>
            <div>
              <span>Low : ${item.main.temp_min}°F</span>
            </div>
            <div>
              <span>Humidity : ${item.main.humidity}%</span>
            </div>
          </div>
        </div>
        </div>
          </div>
        </div>`;
        markup.push(html);
        html = markup.join("");
      });

      document.getElementById("weatherData").innerHTML = html;
    })
    .catch((error) => console.log("error", error));
}
function currentData(){
  var val = document.getElementById("myCities").value;
  var index = x.findIndex((item) => item.name === val);
  var cityId = x[index]["id"];

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  let url = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=83ad5d50272715816586460afb935013`
  fetch(url, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      result.weather.map(item=>{
      let image = ''
        if (item.main === 'Drizzle' || item.main === 'Thunderstorm' || item.main ===  'Rain'){
          image = 'rain'
        }
        else if(['Mist','Smoke','Haze','Dust','Fog','Sand','Ash','Squall','Tornado'].includes(item.main)){
          image = 'haze'
        } 
        else {
          image = item.main
        }
        
      document.body.style.backgroundImage = `url('./images/${image}.jpeg')`;
      document.body.style.backgroundRepeat='no-repeat';
      document.body.style.backgroundSize= 'cover';
      document.body.style.height= '100vh';
      })
      
  
    })
}
function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var day = weekday[a.getDay()];
  var time =
    date +
    " " +
    month +
    " " +
    year +
    ";" +
    day +
    ";" +
    hour +
    ":" +
    min +
    ":" +
    sec;
  return time;
}

daysData();
currentData();
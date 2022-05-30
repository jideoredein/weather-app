const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");



app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
  // res.send("<h1 style= 'font-family: Helvetica; color: #293462;'>Valar Morghulis!</h1>");
});

app.post("/", function(req, res) {


  const query = req.body.cityName.charAt(0).toUpperCase() + req.body.cityName.slice(1);
  const apiKey = "c24c7995fd482318e676c27acac191c8";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {

      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const humidity = weatherData.main.humidity;
      const weatherDescription = weatherData.weather[0].description.charAt(0).toUpperCase() + weatherData.weather[0].description.slice(1);
      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      const country = weatherData.sys.country;
      const feel = weatherData.main.feels_like;



      res.write("<h1 style= 'font-family: Montserrat; color: #293462;'>The Temperature in " + query + " is " + temp + " Degrees Celcius</h1>");
      res.write("<h2 style= 'font-family: Montserrat; color: #293462;'>Description: " + weatherDescription + ".</h2>");
      res.write("<h3 style= 'font-family: Montserrat; color: #293462;'>Country: " + country + "</h3>");
      res.write("<h3 style= 'font-family: Montserrat; color: #293462;'>Feels like " + feel + " Degrees Celcius.</h3>");
      res.write("<h3 style= 'font-family: Montserrat; color: #293462;'>Humidity: " + humidity + "%</h3>");
      res.write("<img src='" + imageUrl + "'/>");


    });
  });

});



app.listen(3000, function() {
  console.log("Server running on port 3000");
});

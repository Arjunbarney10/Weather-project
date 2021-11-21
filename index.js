//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {

  res.sendFile(__dirname + "/mainpage.html")

});

app.post("/", function(req, res) {
  const query = req.body.cityName;
  const apiKey = "6ddc90d836d8dbc5d89d06eeb9790826";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
  const options = {
    method: "POST"
  }
  //const request = https.request(url, options, function(response) {
    // if (response.statusCode === 200) {
    //   res.sendFile(__dirname + "/success.html");
    // }
    // else{
    //   res.sendFile(__dirname + "/failure.html");
    // }

    https.get(url, function(response) {
      console.log(response.statusCode);
      response.on("data", function(data) {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        console.log(weatherDescription);
        // res.write("<h1>The temperature of " + query + " is " + temp + " degrees celsius.</h1>");
        // res.write("<p>The weather is currently " + weatherDescription + "</p>");
        // res.write("<img src=" + imageURL + ">");
        res.write(`
          <html>
            <head>
              <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">            </head>
            </head>
            <body>

            	<div class="container-fluid bg-light p-5">
                  <h1>The temperature of ${query} is ${temp} degree celcius. </h1>


              <p>The weather is currently ${weatherDescription}</p>

              <img src="${imageURL}">
             </div>
            </body>
          </html>
        `);
        console.log(temp);
      });
    });
});

app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
